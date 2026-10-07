#!/usr/bin/env node
/**
 * colour-audit.js — inventories the theme's colour variables and traces where each one is used.
 *
 * Answers, for the theme's SASS and for the stop14-themesystem-legacy library it builds on:
 *   - which variables hold colours (palette slots, black/white, semantic aliases, neutrals, component settings),
 *     where each is declared, what it is declared as, and what it resolves to under the current configuration;
 *   - where each variable is used, and in what role (text colour, background, border, SVG fill, shadow, mixin
 *     argument, alias definition ...);
 *   - which colours are hard-coded (hex, rgb(), named colours) instead of taken from the palette;
 *   - which transforms (mix, rgba, neutral, set-colour, lighten ...) make unmanaged derivatives of palette colours;
 *   - text/background pairs declared in the same rule and their WCAG contrast under the current palette.
 *
 * Method. The theme is compiled once with the real compiler, exactly as gulp does it (the YAML configuration is
 * converted to SASS the same way), so the set of files that make up the stylesheet is known rather than guessed.
 * A second compile appends a probe that prints the value of every global variable, so colour variables are
 * identified by what they hold, not by what they are called. Each compiled file is then scanned line by line.
 *
 *   node tools/colour-audit.js                       # report to tools/colour-audit-output/
 *   node tools/colour-audit.js --out <dir>           # report elsewhere
 *   node tools/colour-audit.js --library <path>      # scan another checkout of the library (default: node_modules)
 *   node tools/colour-audit.js --mainconfig <file>   # another main configuration (default: _00_main_configuration.yml)
 *
 * Output: report.md (the human-readable audit), occurrences.csv (every colour reference, one per line),
 * inventory.json (the variables with declaration, value and counts). Nothing in the theme is changed.
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');
const sass = require('sass');
const colorNames = require('color-name');

// ---------------------------------------------------------------------------------------------------------------
// Arguments and paths

const args = process.argv.slice(2);
function opt(name, fallback) {
  const i = args.indexOf('--' + name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const theme = path.resolve(opt('theme', process.cwd()));
const sourceDir = path.join(theme, 'source');
const packageDir = path.join(theme, 'node_modules', 'stop14-themesystem-legacy', 'source');
const libraryScanDir = path.resolve(opt('library', packageDir));
const mainConfig = path.resolve(theme, opt('mainconfig', '_00_main_configuration.yml'));
const outDir = path.resolve(theme, opt('out', path.join('tools', 'colour-audit-output')));

for (const p of [sourceDir, packageDir, mainConfig]) {
  if (!fs.existsSync(p)) { console.error('Missing: ' + p); process.exit(1); }
}

const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 's14-colour-audit-'));
process.on('exit', () => { try { fs.rmSync(workDir, { recursive: true, force: true }); } catch (e) { /* best effort */ } });

// Same include paths as the gulpfile, so @import resolves identically.
const loadPaths = [
  workDir,
  packageDir + '/sass/a_components', packageDir + '/sass/b_profiles', sourceDir + '/sass',
  packageDir + '/sass/a_components/00_general', packageDir + '/sass/a_components/10_colours_and_patterns',
  packageDir + '/sass/a_components/20_layout', packageDir + '/sass/a_components/30_typography',
  packageDir + '/sass/a_components/40_ui', packageDir + '/sass/a_components/50_animation',
  packageDir + '/sass/a_components/60_site_elements', path.join(theme, 'node_modules'),
];

// ---------------------------------------------------------------------------------------------------------------
// Configuration: YAML -> SASS, as gulpfile.js does it

function yamlToSass(ymlPath, sassPath) {
  const lines = [];
  const emit = (prefix, value) => {
    Object.keys(value || {}).forEach((key) => {
      const item = value[key];
      if (typeof item === 'undefined') return;
      if (item === null) lines.push('$' + prefix + key + ': null');
      else if (typeof item === 'object' && !Array.isArray(item)) emit(prefix + key, item);
      else if (String(item).trim() !== '') lines.push('$' + prefix + key + ': ' + String(item));
    });
  };
  let parsed = {};
  if (ymlPath) parsed = yaml.load(fs.readFileSync(ymlPath, 'utf8'), { json: true }) || {};
  emit('', parsed);
  const header = fs.readFileSync(path.join(theme, 'node_modules', 'stop14-themesystem-legacy', 'boilerplate', 'sass_config_header.txt'), 'utf8');
  fs.writeFileSync(sassPath, header + lines.join('\n') + '\n');
  return parsed;
}

const configKeys = Object.keys(yamlToSass(mainConfig, path.join(workDir, '_00_main_configuration.sass')));
yamlToSass(null, path.join(workDir, '_00_temp_configuration.sass'));

// Line numbers of the keys in the YAML, for the inventory.
const configLines = {};
fs.readFileSync(mainConfig, 'utf8').split('\n').forEach((line, i) => {
  const m = line.match(/^([a-zA-Z0-9_]+)\s*:/);
  if (m && !(m[1] in configLines)) configLines[m[1]] = i + 1;
});

// ---------------------------------------------------------------------------------------------------------------
// Compile

const silence = { silenceDeprecations: ['import', 'global-builtin', 'slash-div', 'color-functions', 'mixed-decls', 'if-function', 'legacy-js-api'], logger: sass.Logger.silent, loadPaths, quietDeps: true };

function compileFile(file) {
  return sass.compile(file, silence);
}

const entry = path.join(sourceDir, 'sass', 'style.sass');
console.error('Compiling ' + path.relative(theme, entry) + ' ...');
const main = compileFile(entry);
const loaded = main.loadedUrls.map((u) => decodeURIComponent(u.pathname)).filter((p) => /\.s[ac]ss$/.test(p));

function scopeOf(file) {
  if (file.startsWith(sourceDir + path.sep)) return 'theme';
  if (file.startsWith(packageDir + path.sep) || file.startsWith(libraryScanDir + path.sep)) return 'library';
  if (file.startsWith(workDir + path.sep)) return 'config';
  return 'vendor';
}
function labelOf(file) {
  const scope = scopeOf(file);
  if (scope === 'theme') return path.relative(sourceDir, file);
  if (scope === 'library') return 'lib:' + path.relative(file.startsWith(packageDir) ? packageDir : libraryScanDir, file).replace(/^sass\//, '');
  if (scope === 'config') return 'config:' + path.basename(file);
  return 'vendor:' + path.relative(path.join(theme, 'node_modules'), file);
}

// The library files that exist but are not part of this build (scanned separately, counted separately).
function walk(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.s[ac]ss$/.test(name)) acc.push(p);
  }
  return acc;
}
const libraryAll = walk(path.join(libraryScanDir, 'sass'), []);
const compiledSet = new Set(loaded);
const compiledLibraryRel = new Set(loaded.filter((f) => scopeOf(f) === 'library').map((f) => path.relative(packageDir, f)));
const libraryUncompiled = libraryAll.filter((f) => !compiledSet.has(f) && !compiledLibraryRel.has(path.relative(libraryScanDir, f)));

// ---------------------------------------------------------------------------------------------------------------
// Variable inventory: every `$name:` declaration in the compiled files, probed through the compiler

const declRe = /^(\s*)\$([\w-]+)\s*:\s*(.+?)\s*$/;
const declarations = {}; // name -> [{file, line, value, indent}]
function stripComment(line) {
  // Indented syntax: // to end of line. Block comments are handled by the scanner's state.
  const i = line.indexOf('//');
  if (i >= 0 && !/url\(|https?:/.test(line.slice(0, i + 2))) return line.slice(0, i);
  return line;
}
function readLines(file) {
  return fs.readFileSync(file, 'utf8').split('\n');
}
// Lines with block comments removed (indented syntax: a /* line and its deeper-indented continuation lines).
function codeLines(file) {
  const out = [];
  let inBlock = false, blockIndent = -1;
  readLines(file).forEach((raw, i) => {
    const indent = raw.match(/^\s*/)[0].length;
    const trimmed = raw.trim();
    if (inBlock) {
      if (trimmed === '' || indent > blockIndent || trimmed.startsWith('*')) { out.push({ n: i + 1, text: '' }); if (/\*\//.test(raw)) inBlock = false; return; }
      inBlock = false;
    }
    if (trimmed.startsWith('/*')) {
      inBlock = !/\*\//.test(raw);
      blockIndent = indent;
      out.push({ n: i + 1, text: '' });
      return;
    }
    out.push({ n: i + 1, text: stripComment(raw) });
  });
  return out;
}

const allScanFiles = loaded.filter((f) => scopeOf(f) !== 'config');
for (const file of allScanFiles) {
  for (const { n, text } of codeLines(file)) {
    const m = text.match(declRe);
    if (m) (declarations[m[2]] = declarations[m[2]] || []).push({ file, line: n, value: m[3].replace(/\s*!default$/, ''), indent: m[1].length, isDefault: /!default/.test(m[3]) });
  }
}
for (const key of configKeys) (declarations[key] = declarations[key] || []).unshift({ file: mainConfig, line: configLines[key], value: null, indent: 0, config: true });

// Probe: append to a copy of the entry a :root block that prints every variable that exists globally.
const names = Object.keys(declarations).sort();
const probe = [fs.readFileSync(entry, 'utf8'), '', '.__colour_audit_probe__']
  .concat(names.map((n) => `  @if variable-exists('${n}')\n    --p-${n}: "#{inspect($${n})}"`))
  .join('\n') + '\n';
fs.writeFileSync(path.join(sourceDir, 'sass', '__colour_audit_probe__.sass'), probe);
let probeCss;
try {
  console.error('Probing ' + names.length + ' variables ...');
  probeCss = compileFile(path.join(sourceDir, 'sass', '__colour_audit_probe__.sass')).css;
} finally {
  fs.unlinkSync(path.join(sourceDir, 'sass', '__colour_audit_probe__.sass'));
}
const resolved = {};
for (const m of probeCss.matchAll(/--p-([\w-]+):\s*"(.*?)";/g)) resolved[m[1]] = m[2].replace(/\\"/g, '"');

// Colour recognition
const NAMED = new Set(Object.keys(colorNames));
const hexRe = /#([0-9a-f]{3,8})\b/gi;
function isColourValue(v) {
  if (v == null) return false;
  const s = v.trim().toLowerCase();
  if (/^#[0-9a-f]{3,8}$/.test(s)) return true;
  if (/^(rgba?|hsla?)\(/.test(s)) return true;
  if (NAMED.has(s) || s === 'transparent') return true;
  return false;
}
function isColourMap(v) {
  return v != null && /^\(/.test(v.trim()) && /#[0-9a-f]{3,8}|rgba?\(|\b(white|black)\b/i.test(v) && !/px|em|rem/.test(v);
}
function toRgb(v) {
  if (v == null) return null;
  const s = v.trim().toLowerCase();
  let m;
  if ((m = s.match(/^#([0-9a-f]{3,8})$/))) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a };
  }
  if ((m = s.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)$/))) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] != null ? +m[4] : 1 };
  if ((m = s.match(/^rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?))?\s*\)$/))) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] != null ? (m[4].endsWith('%') ? parseFloat(m[4]) / 100 : +m[4]) : 1 };
  if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  if (NAMED.has(s)) { const [r, g, b] = colorNames[s]; return { r, g, b, a: 1 }; }
  return null;
}
function toHex(c) {
  const h = (n) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  return '#' + h(c.r) + h(c.g) + h(c.b) + (c.a < 1 ? h(c.a * 255) : '');
}
function sassMix(c1, c2, weightPct) {
  // SASS mix(): weight applies to c1.
  const p = weightPct / 100, w = p * 2 - 1, a = c1.a - c2.a;
  const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2, w2 = 1 - w1;
  return { r: c1.r * w1 + c2.r * w2, g: c1.g * w1 + c2.g * w2, b: c1.b * w1 + c2.b * w2, a: c1.a * p + c2.a * (1 - p) };
}
function luminance(c) {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}
function contrast(a, b) {
  const la = luminance(a), lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

// Which globals hold colours
const colourVars = {};
for (const n of names) {
  const v = resolved[n];
  if (v == null) continue;
  if (isColourValue(v)) colourVars[n] = { kind: 'colour', value: v, rgb: toRgb(v) };
  else if (isColourMap(v)) colourVars[n] = { kind: 'map', value: v };
}
// Scoped variables (inside mixins/blocks) declared with a colour literal or a colour variable — counted as local.
const localColourVars = {};
for (const n of names) {
  if (colourVars[n]) continue;
  for (const d of declarations[n]) {
    if (d.value && (isColourValue(d.value) || /\$([\w-]+)/.test(d.value) && d.value.match(/\$([\w-]+)/g).some((t) => colourVars[t.slice(1)]))) {
      (localColourVars[n] = localColourVars[n] || []).push(d);
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Scan: every colour reference in every file

const PROP_CLASS = [
  [/^color$/, 'text'], [/^text-decoration-color$/, 'text'], [/^caret-color$/, 'text'], [/^-webkit-text-fill-color$/, 'text'],
  [/^background(-color)?$/, 'background'], [/^background-image$/, 'background'],
  [/^border/, 'border'], [/^outline/, 'border'], [/^column-rule/, 'border'],
  [/^fill$/, 'svg'], [/^stroke/, 'svg'],
  [/shadow$/, 'shadow'], [/^filter$/, 'shadow'],
  [/^--/, 'css-var'],
  [/^accent-color$/, 'ui'], [/^scrollbar-color$/, 'ui'],
];
function classify(prop) {
  for (const [re, cls] of PROP_CLASS) if (re.test(prop)) return cls;
  return 'other';
}
const WRAPPERS = ['mix', 'rgba', 'rgb', 'neutral', 'neutral_mix', 'set-colour', 'set-color', 'set-colour-tint', 'set-color-tint', 'lighten', 'darken', 'transparentize', 'fade-out', 'fade-in', 'opacify', 'saturate', 'desaturate', 'adjust-hue', 'scale-color', 'adjust-color', 'change-color', 'invert', 'grayscale', 'complement', 'map-get', 'linear-gradient', 'radial-gradient'];
function wrapperAt(text, idx) {
  // Innermost function call that contains position idx.
  let depth = 0, best = null;
  for (let i = idx - 1; i >= 0; i--) {
    const ch = text[i];
    if (ch === ')') depth++;
    else if (ch === '(') {
      if (depth === 0) {
        const m = text.slice(0, i).match(/([\w-]+)\s*$/);
        if (m) { best = m[1]; break; }
        break;
      }
      depth--;
    }
  }
  return best;
}
function inStringOrUrl(text, idx) {
  const before = text.slice(0, idx);
  const quotes = (before.match(/"/g) || []).length + (before.match(/'/g) || []).length;
  if (quotes % 2 === 1) return true;
  const u = before.lastIndexOf('url(');
  return u >= 0 && before.indexOf(')', u) < 0;
}

const occurrences = [];
const fileStats = {};
function scanFile(file, scope) {
  const label = labelOf(file);
  const lines = codeLines(file);
  const stack = []; // [{indent, selector}]
  let currentMixin = null;
  const blocks = {}; // blockKey -> {selector, decls: {text:[], background:[]}}
  for (const { n, text } of lines) {
    if (!text.trim()) continue;
    const indent = text.match(/^\s*/)[0].length;
    const body = text.trim();
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
    if (currentMixin && indent <= currentMixin.indent) currentMixin = null;

    let kind = 'other', prop = null, value = body, cls = null;
    let m;
    if ((m = body.match(/^\$([\w-]+)\s*:\s*(.+)$/))) { kind = 'var-def'; prop = '$' + m[1]; value = m[2]; }
    else if ((m = body.match(/^(=|@mixin\s+)([\w-]+)\s*(\(.*\))?/))) { kind = 'mixin-def'; prop = m[2]; value = m[3] || ''; currentMixin = { name: m[2], indent }; stack.push({ indent, selector: '=' + m[2] }); }
    else if ((m = body.match(/^@function\s+([\w-]+)\s*(\(.*\))?/))) { kind = 'function-def'; prop = m[1]; value = m[2] || ''; currentMixin = { name: m[1], indent }; stack.push({ indent, selector: '@function ' + m[1] }); }
    else if ((m = body.match(/^(\+|@include\s+)([\w-]+)\s*(\(.*\))?/))) { kind = 'mixin-call'; prop = m[2]; value = m[3] || ''; }
    else if ((m = body.match(/^@(if|else|each|for|while|return|debug|warn|error)\b(.*)$/))) { kind = 'control'; prop = '@' + m[1]; value = m[2]; if (/^(if|else|each|for|while)$/.test(m[1])) stack.push({ indent, selector: body }); }
    else if (/^@(import|use|forward|media|supports|extend|charset|keyframes|font-face)\b/.test(body)) { if (/^@(media|supports|keyframes|font-face)/.test(body)) stack.push({ indent, selector: body }); continue; }
    else if ((m = body.match(/^([a-zA-Z-]+(?:-[\w]+)*|--[\w-]+)\s*:\s+(.+)$/))) { kind = 'property'; prop = m[1].toLowerCase(); value = m[2]; cls = classify(prop); }
    else { stack.push({ indent, selector: body }); continue; }

    const selectorPath = stack.filter((s) => !/^[=@]/.test(s.selector) || true).map((s) => s.selector).join(' ');
    const blockKey = stack.map((s) => s.indent + ':' + s.selector).join('|');
    const found = [];

    // Variables
    for (const vm of value.matchAll(/\$([\w-]+)/g)) {
      const name = vm[1];
      if (kind === 'var-def' && false) continue;
      if (!colourVars[name] && !localColourVars[name]) continue;
      if (inStringOrUrl(value, vm.index)) continue;
      found.push({ token: '$' + name, type: colourVars[name] ? (colourVars[name].kind === 'map' ? 'map-var' : 'var') : 'local-var', wrapper: wrapperAt(value, vm.index), resolved: colourVars[name] ? colourVars[name].value : null });
    }
    // set-colour(N …) / set-color(N …): a reference to palette slot N by number
    for (const sm of value.matchAll(/\bset-colou?r(?:-tint)?\(\s*(\d+)/g)) {
      if (inStringOrUrl(value, sm.index)) continue;
      const name = 'clr' + sm[1];
      found.push({ token: '$' + name, type: colourVars[name] ? 'var' : 'local-var', wrapper: 'set-colour', resolved: colourVars[name] ? colourVars[name].value : null });
    }
    // Hex literals
    for (const hm of value.matchAll(hexRe)) {
      if (inStringOrUrl(value, hm.index)) continue;
      if (kind === 'property' && /^--/.test(prop) === false && false) continue;
      found.push({ token: hm[0].toLowerCase(), type: 'literal', wrapper: wrapperAt(value, hm.index), resolved: hm[0].toLowerCase() });
    }
    // rgb()/hsl() literals with numeric first argument
    for (const rm of value.matchAll(/\b(rgba?|hsla?|hsb)\(\s*(\d)/g)) {
      if (inStringOrUrl(value, rm.index)) continue;
      const close = value.indexOf(')', rm.index);
      found.push({ token: value.slice(rm.index, close + 1), type: 'literal', wrapper: wrapperAt(value, rm.index), resolved: null });
    }
    // Named colours (not preceded by $ or - or letters; not a property/selector word)
    for (const nm of value.matchAll(/(?<![\w$#-])([a-zA-Z]+)(?![\w-]*\s*[:(])/g)) {
      const w = nm[1].toLowerCase();
      if (!NAMED.has(w) && w !== 'transparent' && w !== 'currentcolor') continue;
      if (inStringOrUrl(value, nm.index)) continue;
      if (kind === 'mixin-call' || kind === 'property' || kind === 'var-def' || kind === 'mixin-def') {
        // Exclude words that are CSS keywords in a non-colour sense within the property's own grammar.
        if (w === 'tan' || w === 'plum' && false) continue;
        if (kind === 'property' && (cls === 'other') && !/color|colour|background|border|fill|stroke|shadow|outline/.test(prop)) continue;
        found.push({ token: w, type: (w === 'transparent' || w === 'currentcolor') ? 'keyword' : 'literal', wrapper: wrapperAt(value, nm.index), resolved: w === 'currentcolor' ? null : w });
      }
    }
    if (!found.length) continue;

    const fs_ = fileStats[label] = fileStats[label] || { scope, vars: new Set(), literals: new Set(), roles: {}, count: 0 };
    for (const f of found) {
      const role = kind === 'property' ? cls : kind;
      occurrences.push({ scope, file: label, line: n, kind, prop, role, token: f.token, type: f.type, wrapper: f.wrapper || '', resolved: f.resolved || '', inMixin: currentMixin ? currentMixin.name : '', selector: selectorPath.slice(0, 120), value: value.slice(0, 160) });
      fs_.count++;
      if (f.type === 'var' || f.type === 'map-var' || f.type === 'local-var') fs_.vars.add(f.token); else if (f.type === 'literal') fs_.literals.add(f.token);
      fs_.roles[role] = (fs_.roles[role] || 0) + 1;
    }

    // Text/background pairs within the same rule block (properties only, not inside mixin definitions)
    if (kind === 'property' && (cls === 'text' || cls === 'background') && !currentMixin) {
      const b = blocks[blockKey] = blocks[blockKey] || { selector: selectorPath, file: label, line: n, text: [], background: [] };
      b[cls].push({ line: n, prop, value });
    }
  }
  // Evaluate pairs (compiled files only)
  for (const b of Object.values(blocks)) {
    if (scope === 'library-uncompiled') break;
    if (!b.text.length || !b.background.length) continue;
    if (b.background.some((d) => d.prop === 'background-image' || /gradient|url\(/.test(d.value))) continue;
    const t = evaluate(b.text[b.text.length - 1].value), g = evaluate(b.background[b.background.length - 1].value);
    pairs.push({ file: b.file, line: b.line, selector: b.selector, text: b.text[b.text.length - 1].value, background: b.background[b.background.length - 1].value, textRgb: t, bgRgb: g, ratio: t && g && g.a === 1 && t.a === 1 ? contrast(t, g) : null });
  }
}
const pairs = [];

// Evaluate a simple colour expression to RGB under the current configuration: $var, literal, neutral(n), mix(a,b,w%), rgba($var,a)
function evaluate(expr) {
  const s = expr.trim().replace(/\s*!important$/, '');
  let m;
  if ((m = s.match(/^\$([\w-]+)$/))) return colourVars[m[1]] && colourVars[m[1]].rgb || null;
  const lit = toRgb(s);
  if (lit) return lit;
  if ((m = s.match(/^neutral\(\s*(\d+)?\s*\)$/))) {
    const bk = (colourVars.surface_dark || colourVars.black || {}).rgb, wh = (colourVars.surface_light || colourVars.white || {}).rgb;
    return bk && wh ? sassMix(bk, wh, m[1] != null ? +m[1] : 50) : null;
  }
  if ((m = s.match(/^mix\(\s*(.+?)\s*,\s*(.+?)\s*,\s*([\d.]+)%\s*\)$/))) {
    const a = evaluate(m[1]), b = evaluate(m[2]);
    return a && b ? sassMix(a, b, +m[3]) : null;
  }
  if ((m = s.match(/^rgba\(\s*(\$[\w-]+|#[0-9a-f]+)\s*,\s*([\d.]+)\s*\)$/i))) {
    const c = evaluate(m[1]);
    return c ? { ...c, a: +m[2] } : null;
  }
  if ((m = s.match(/^set-colou?r\(\s*(\d+)\s*\)$/))) return colourVars['clr' + m[1]] && colourVars['clr' + m[1]].rgb || null;
  return null;
}

for (const file of allScanFiles) scanFile(file, scopeOf(file));
for (const file of libraryUncompiled) scanFile(file, 'library-uncompiled');

// ---------------------------------------------------------------------------------------------------------------
// Aggregate

const byVar = {};
for (const o of occurrences) {
  if (o.type !== 'var' && o.type !== 'map-var' && o.type !== 'local-var') continue;
  const v = byVar[o.token] = byVar[o.token] || { theme: 0, library: 0, uncompiled: 0, roles: {}, files: new Set(), wrappers: {}, roleFiles: {} };
  if (o.scope === 'theme') v.theme++; else if (o.scope === 'library') v.library++; else v.uncompiled++;
  if (o.scope !== 'library-uncompiled') {
    v.roles[o.role] = (v.roles[o.role] || 0) + 1;
    v.files.add(o.file);
    (v.roleFiles[o.role] = v.roleFiles[o.role] || new Set()).add(o.file);
    if (o.wrapper) v.wrappers[o.wrapper] = (v.wrappers[o.wrapper] || 0) + 1;
  }
}

// Alias chain: declared value of each colour var (config or sass), and what it points at.
function declaredValue(name) {
  const ds = declarations[name] || [];
  const cfg = ds.find((d) => d.config);
  if (cfg) {
    // Read the raw YAML value
    const raw = fs.readFileSync(mainConfig, 'utf8').split('\n')[cfg.line - 1];
    return raw.replace(/^[^:]+:\s*/, '').replace(/^"(.*)"$/, '$1').trim();
  }
  const global = ds.filter((d) => d.indent === 0);
  return (global.length ? global[global.length - 1] : ds[ds.length - 1]).value;
}
function declaredWhere(name) {
  const ds = declarations[name] || [];
  const cfg = ds.find((d) => d.config);
  if (cfg) return '_00_main_configuration.yml:' + cfg.line;
  const global = ds.filter((d) => d.indent === 0);
  const d = global.length ? global[global.length - 1] : ds[ds.length - 1];
  return labelOf(d.file) + ':' + d.line;
}
function pointsAt(value) {
  return (value.match(/\$([\w-]+)/g) || []).map((t) => t.slice(1)).filter((t) => colourVars[t]);
}

// Group the colour variables
function group(name) {
  if (/^clr\d+$/.test(name)) return 'palette';
  if (/^clr\d+_map$/.test(name)) return 'library-map';
  if (/^(black|white|true_black)$/.test(name)) return 'black-white';
  if (/^(surface_dark|surface_light|on_dark|on_light|visual_impact|brand_primary|brand_secondary|on_impact|brand_accent|accent_\d+)$/.test(name)) return 'role';
  if (/neutral/.test(name)) return 'neutral';
  if (/^(bgcolor|footer_bg|menu_background|impact|cta|de_emphasized|de_activated|link_colour.*|welcome_block_bg|welcome_block_color|menu_color)$/.test(name)) return 'semantic';
  if (configKeys.includes(name)) return 'component-setting';
  return 'library-or-local';
}

fs.mkdirSync(outDir, { recursive: true });

// ---------------------------------------------------------------------------------------------------------------
// occurrences.csv

const csvEsc = (s) => '"' + String(s == null ? '' : s).replace(/"/g, '""') + '"';
const csvHead = ['scope', 'file', 'line', 'kind', 'property', 'role', 'token', 'type', 'wrapper', 'resolved', 'in_mixin', 'selector', 'value'];
fs.writeFileSync(path.join(outDir, 'occurrences.csv'), [csvHead.join(',')].concat(occurrences.map((o) => [o.scope, o.file, o.line, o.kind, o.prop, o.role, o.token, o.type, o.wrapper, o.resolved, o.inMixin, o.selector, o.value].map(csvEsc).join(','))).join('\n') + '\n');

// inventory.json
const inventory = Object.keys(colourVars).sort().map((n) => ({
  name: n, group: group(n), kind: colourVars[n].kind, declared: declaredValue(n), declaredWhere: declaredWhere(n), resolved: colourVars[n].value,
  pointsAt: pointsAt(declaredValue(n) || ''), uses: byVar['$' + n] ? { theme: byVar['$' + n].theme, library: byVar['$' + n].library, libraryUncompiled: byVar['$' + n].uncompiled, roles: byVar['$' + n].roles, wrappers: byVar['$' + n].wrappers, files: [...byVar['$' + n].files] } : { theme: 0, library: 0, libraryUncompiled: 0, roles: {}, wrappers: {}, files: [] },
}));
fs.writeFileSync(path.join(outDir, 'inventory.json'), JSON.stringify({ generated: new Date().toISOString(), theme, library: libraryScanDir, filesCompiled: { theme: allScanFiles.filter((f) => scopeOf(f) === 'theme').length, library: allScanFiles.filter((f) => scopeOf(f) === 'library').length, vendor: allScanFiles.filter((f) => scopeOf(f) === 'vendor').length }, libraryUncompiled: libraryUncompiled.length, variables: inventory, localColourVars: Object.keys(localColourVars).map((n) => ({ name: n, declarations: localColourVars[n].map((d) => ({ where: labelOf(d.file) + ':' + d.line, value: d.value })) })) }, null, 2));

// ---------------------------------------------------------------------------------------------------------------
// report.md

const md = [];
const h = (s) => md.push('', s, '');
const table = (head, rows) => { md.push('| ' + head.join(' | ') + ' |', '|' + head.map(() => '---').join('|') + '|'); rows.forEach((r) => md.push('| ' + r.map((c) => String(c == null ? '' : c).replace(/\|/g, '\\|')).join(' | ') + ' |')); md.push(''); };
const roleOrder = ['text', 'background', 'border', 'svg', 'shadow', 'ui', 'css-var', 'other', 'var-def', 'mixin-def', 'mixin-call', 'control'];
const roleCell = (roles) => roleOrder.filter((r) => roles[r]).map((r) => `${r} ${roles[r]}`).join(', ');

const themeFiles = allScanFiles.filter((f) => scopeOf(f) === 'theme');
const libFiles = allScanFiles.filter((f) => scopeOf(f) === 'library');
const occTheme = occurrences.filter((o) => o.scope === 'theme'), occLib = occurrences.filter((o) => o.scope === 'library'), occUn = occurrences.filter((o) => o.scope === 'library-uncompiled');
const count = (arr, pred) => arr.filter(pred).length;

md.push('# Colour usage audit — ' + path.basename(theme));
md.push('');
md.push(`Generated ${new Date().toISOString().slice(0, 10)} by \`tools/colour-audit.js\` from \`${path.relative(theme, mainConfig)}\`. Library scanned: \`${path.relative(theme, libraryScanDir) || libraryScanDir}\`. Nothing here is hand-edited; re-run the tool after changes.`);

h('## 1. Scope');
table(['', 'Files', 'Colour references', 'of which variables', 'hard-coded colours', 'transparent / currentColor'], [
  ['Theme SASS (compiled)', themeFiles.length, occTheme.length, count(occTheme, (o) => /var/.test(o.type)), count(occTheme, (o) => o.type === 'literal'), count(occTheme, (o) => o.type === 'keyword')],
  ['Library SASS compiled into the theme', libFiles.length, occLib.length, count(occLib, (o) => /var/.test(o.type)), count(occLib, (o) => o.type === 'literal'), count(occLib, (o) => o.type === 'keyword')],
  ['Library SASS not in this build', libraryUncompiled.length, occUn.length, count(occUn, (o) => /var/.test(o.type)), count(occUn, (o) => o.type === 'literal'), count(occUn, (o) => o.type === 'keyword')],
]);
md.push(`Global variables probed: ${names.length}. Holding a colour: ${Object.values(colourVars).filter((v) => v.kind === 'colour').length}; holding a colour map: ${Object.values(colourVars).filter((v) => v.kind === 'map').length}. Scoped (non-global) colour variables: ${Object.keys(localColourVars).length}.`);
md.push('');
md.push('"Role" is the CSS property a reference colours: text (`color`), background, border (incl. outline), svg (fill/stroke), shadow; `var-def` = used to define another variable, `mixin-def` = a mixin parameter default, `mixin-call` = passed to a mixin, `css-var` = emitted as a CSS custom property.');

h('## 2. Palette, black/white and semantic aliases');
md.push('Declared = what the configuration or SASS says; resolved = the value the compiler produced for this configuration. Uses count references in compiled files (theme / library); roles are for compiled files only.');
md.push('');
const groupsOrder = ['palette', 'role', 'black-white', 'semantic', 'neutral', 'component-setting', 'library-map', 'library-or-local'];
const groupTitles = { palette: 'Palette slots', role: 'Colour roles (section 7.3 of the requirements)', 'black-white': 'Black and white points', semantic: 'Semantic aliases', neutral: 'Neutral aliases', 'component-setting': 'Component colour settings (configuration keys)', 'library-map': 'Library colour maps', 'library-or-local': 'Other global colour variables (library components and theme partials)' };
for (const g of groupsOrder) {
  const rows = inventory.filter((v) => v.group === g);
  if (!rows.length) continue;
  md.push('### ' + groupTitles[g]);
  md.push('');
  table(['Variable', 'Declared as', 'Where', 'Resolves to', 'Uses theme', 'Uses library', 'Roles (compiled)'], rows.map((v) => ['`$' + v.name + '`', '`' + (v.declared || '').slice(0, 60) + '`', v.declaredWhere, '`' + (v.kind === 'map' ? v.resolved.slice(0, 70) + (v.resolved.length > 70 ? '…' : '') : v.resolved) + '`', v.uses.theme, v.uses.library, roleCell(v.uses.roles)]));
}

h('## 3. Palette contrast under the current configuration');
md.push('WCAG 2 contrast of each colour against the white point and the black point. A colour needs 4.5 against the surface it is text on (3 for large text or UI parts), and the same the other way round when it is a surface for white or black text. This is what a usage recommendation per slot has to be checked against.');
md.push('');
const wh = colourVars.white && colourVars.white.rgb, bk = colourVars.black && colourVars.black.rgb;
const grade = (r) => r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA large' : '**fail**';
const matrixVars = inventory.filter((v) => v.kind === 'colour' && ['palette', 'role', 'black-white', 'semantic', 'neutral'].includes(v.group) && !/^clr(1\d|20)$/.test(v.name) && v.name !== 'white' && v.name !== 'black' && colourVars[v.name].rgb && colourVars[v.name].rgb.a === 1);
table(['Variable', 'Value', 'vs white', '', 'vs black', '', 'Used as text', 'Used as background'], matrixVars.map((v) => {
  const c = colourVars[v.name].rgb, rw = wh ? contrast(c, wh) : null, rb = bk ? contrast(c, bk) : null;
  return ['`$' + v.name + '`', toHex(c), rw ? rw.toFixed(2) : '', rw ? grade(rw) : '', rb ? rb.toFixed(2) : '', rb ? grade(rb) : '', v.uses.roles.text || 0, v.uses.roles.background || 0];
}));
md.push(`Black point \`$black\` = ${bk ? toHex(bk) : '?'}, white point \`$white\` = ${wh ? toHex(wh) : '?'}; their mutual contrast is ${wh && bk ? contrast(wh, bk).toFixed(2) : '?'}.`);

h('## 4. Direct palette-slot references in rules');
md.push('Rules that name a numbered slot (`$clr2`) rather than a semantic alias. These are the places where a component has bound itself to one position in the palette: change the palette order and the component changes meaning.');
md.push('');
const direct = occurrences.filter((o) => /^\$clr\d+$/.test(o.token) && o.role !== 'var-def' && o.scope !== 'library-uncompiled');
table(['Where', 'Role', 'Slot', 'Declaration'], direct.map((o) => [o.file.replace(/^sass\//, '') + ':' + o.line, o.role, '`' + o.token + '`', '`' + o.value + '`']));
const unreferenced = inventory.filter((v) => v.group === 'palette' && !/^clr(1\d|20)$/.test(v.name) && !Object.keys(v.uses.roles).some((r) => r !== 'var-def' && r !== 'css-var'));
md.push(`Palette slots never used directly in a rule (only through aliases or the CSS-variable export): ${unreferenced.map((v) => '`$' + v.name + '`' + (inventory.filter((w) => w.pointsAt.includes(v.name) && !/_map$/.test(w.name)).length ? ' (via ' + inventory.filter((w) => w.pointsAt.includes(v.name) && !/_map$/.test(w.name)).map((w) => '`$' + w.name + '`').join(', ') + ')' : ' (unused)')).join(', ')}.`);

h('## 5. Same variable, different roles');
md.push('A variable used both as a text colour and as a background (or border) has two different contrast obligations. The canvas pair (`$black`, `$white`), the surfaces and the on-* roles are left out: on the continuum each of them is both a surface and a text colour by design. What remains cannot be given one usage recommendation.');
md.push('');
// $black/$white (the canvas and its text), the surfaces and the on-* roles are both surfaces and text by design (the continuum).
const conflicting = inventory.filter((v) => !/^(black|white|surface[-_](light|dark|brand(?:[-_]secondary)?)|on[-_](light|dark|brand(?:[-_]secondary)?|impact))$/.test(v.name) && v.uses.roles.text && (v.uses.roles.background || v.uses.roles.border));
table(['Variable', 'As text in', 'As background in', 'As border in'], conflicting.map((v) => {
  const rf = byVar['$' + v.name].roleFiles;
  const list = (r) => rf[r] ? [...rf[r]].map((f) => f.replace(/^sass\//, '')).join('<br>') : '';
  return ['`$' + v.name + '`', list('text'), list('background'), list('border')];
}));

h('## 6. Per-file colour vocabulary');
md.push('Which colour variables and hard-coded colours each file draws on. Files reaching for many palette slots, or for literals, are the ones built to their own palette.');
md.push('');
const fileRows = Object.entries(fileStats).filter(([, s]) => s.scope !== 'library-uncompiled').sort((a, b) => (a[1].scope === 'theme' ? 0 : 1) - (b[1].scope === 'theme' ? 0 : 1) || b[1].count - a[1].count);
table(['File', 'Refs', 'Variables', 'Hard-coded', 'Roles'], fileRows.map(([f, s]) => [f.replace(/^sass\//, ''), s.count, [...s.vars].join(' '), [...s.literals].join(' '), roleCell(s.roles)]));

h('## 7. Hard-coded colours');
md.push('Colour values written directly instead of taken from a variable. `white`/`black` keywords are included because they bypass `$white`/`$black`.');
md.push('');
const litsAll = occurrences.filter((o) => o.type === 'literal' && o.scope !== 'library-uncompiled');
const lits = litsAll.filter((o) => o.role !== 'var-def'), litDecl = litsAll.filter((o) => o.role === 'var-def');
const litByToken = {};
for (const o of lits) (litByToken[o.token] = litByToken[o.token] || []).push(o);
md.push(`In rules and mixins (theme ${lits.filter((o) => o.scope === 'theme').length}, library ${lits.filter((o) => o.scope === 'library').length}):`);
md.push('');
table(['Colour', 'Count', 'Where (file:line role)'], Object.entries(litByToken).sort((a, b) => b[1].length - a[1].length).map(([t, os]) => ['`' + t + '`', os.length, os.slice(0, 12).map((o) => `${o.file.replace(/^sass\//, '')}:${o.line} ${o.role}${o.wrapper ? ' in ' + o.wrapper + '()' : ''}`).join('<br>') + (os.length > 12 ? `<br>… ${os.length - 12} more` : '')]));
md.push(`In variable declarations: ${litDecl.length}, of which ${litDecl.filter((o) => /_01_configuration_colour_and_patterns/.test(o.file)).length} are the library's own palette defaults (\`$clr1\`–\`$clr20\`, \`$black\`, \`$white\`, \`$impact: red\`, \`$cta: blue\`); the rest: ${litDecl.filter((o) => !/_01_configuration_colour_and_patterns/.test(o.file)).map((o) => `${o.file.replace(/^sass\//, '')}:${o.line} ${o.prop}`).join(', ') || 'none'}.`);

h('## 8. Transforms applied to palette colours');
md.push('Every `mix()`, `rgba()`, `lighten()` … applied to a palette variable creates a derived colour that no setting controls and no contrast check sees. `neutral()` is the library\'s sanctioned way to derive greys; everything else is ad hoc.');
md.push('');
const wrapCounts = {};
for (const o of occurrences) if (o.wrapper && /var/.test(o.type) && o.scope !== 'library-uncompiled') { const k = o.wrapper; wrapCounts[k] = wrapCounts[k] || { n: 0, vars: {} }; wrapCounts[k].n++; wrapCounts[k].vars[o.token] = (wrapCounts[k].vars[o.token] || 0) + 1; }
table(['Function', 'Uses', 'On which variables'], Object.entries(wrapCounts).sort((a, b) => b[1].n - a[1].n).map(([k, v]) => ['`' + k + '()`', v.n, Object.entries(v.vars).sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t} ×${n}`).join(', ')]));

h('## 9. Text on background: pairs declared in one rule');
md.push('Only pairs where a rule sets both `color` and a plain `background(-color)` are listed; inherited backgrounds are not seen, so this is a floor, not the whole picture. Ratios are WCAG 2 contrast under the current configuration. AA needs 4.5 for body text and 3 for large text.');
md.push('');
const evalPairs = pairs.filter((p) => p.ratio != null).sort((a, b) => a.ratio - b.ratio);
const unevaluated = pairs.filter((p) => p.ratio == null);
table(['Ratio', 'Text', 'Background', 'Where', 'Selector'], evalPairs.map((p) => [(p.ratio < 3 ? '**' : '') + p.ratio.toFixed(2) + (p.ratio < 3 ? '**' : p.ratio < 4.5 ? ' *' : ''), '`' + p.text + '` ' + toHex(p.textRgb), '`' + p.background + '` ' + toHex(p.bgRgb), p.file.replace(/^sass\//, '') + ':' + p.line, p.selector.replace(/\s+/g, ' ').slice(0, 70)]));
md.push(`Pairs that could not be evaluated (compound expressions): ${unevaluated.length}. Bold = below 3:1; * = between 3:1 and 4.5:1.`);

h('## 10. Library specifics');
const maps = inventory.filter((v) => v.group === 'library-map');
if (maps.length) {
  md.push('**Colour maps are computed from the library defaults, not from this palette.** `$clrN_map` is defined in the library core, which the theme imports before its own configuration, so the maps (and the `--colour--N--shade/tint/fade/watermark` CSS variables built from them) hold derivatives of the library\'s grey defaults:');
  md.push('');
  table(['Map', 'Resolved value', 'Palette slot it should follow'], maps.map((v) => ['`$' + v.name + '`', '`' + v.resolved + '`', '`$' + v.name.replace('_map', '') + '` = ' + (colourVars[v.name.replace('_map', '')] || {}).value]));
}
const libDefaults = ['impact', 'cta', 'de_emphasized', 'de_activated', 'link_colour', 'bgcolor', 'footer_bg'];
md.push('**Library defaults for the semantic aliases** (from `10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass`): ' + libDefaults.map((n) => { const d = (declarations[n] || []).find((x) => scopeOf(x.file) === 'library'); return d ? `\`$${n}: ${d.value}\`` : null; }).filter(Boolean).join(', ') + '. The theme configuration overrides all of them; a theme that omitted one would get `red`/`blue`.');
md.push('');
const setColour = occurrences.filter((o) => /set-colou?r/.test(o.wrapper) && o.scope !== 'library-uncompiled');
if (colourVars.neutral && bk && wh) {
  // neutral() mixes the poles when the library defines them (colour roles), black and white otherwise.
  const poleDark = colourVars.surface_dark && colourVars.surface_dark.rgb || bk, poleLight = colourVars.surface_light && colourVars.surface_light.rgb || wh;
  const expected = sassMix(poleDark, poleLight, 50), actual = colourVars.neutral.rgb;
  if (toHex(expected) !== toHex(actual)) {
    const same = inventory.filter((v) => v.group === 'neutral' && v.name !== 'neutral' && colourVars[v.name].rgb && toHex(colourVars[v.name].rgb) === toHex(actual)).map((v) => '`$' + v.name + '`');
    md.push(`**\`$neutral\` is overwritten by the library.** It is declared as \`neutral()\` (= ${toHex(expected)}) but resolves to ${toHex(actual)}${same.length ? ' (the value of ' + same.join(', ') + ')' : ''}: \`root_colour_variables/_colour_root_variables.sass\` assigns \`$neutral\` inside a top-level \`@for\` loop, and SASS treats that as an assignment to the existing global, so the loop's last step (\`neutral(90)\`) wins. Harmless today only because nothing uses \`$neutral\`.`);
    md.push('');
  }
}
md.push(`**\`set-colour()\` usage** (compiled): ${setColour.length} references${setColour.length ? ' — ' + [...new Set(setColour.map((o) => o.file.replace(/^sass\//, '')))].join(', ') : ''}.`);
md.push('');
const rootVars = occurrences.filter((o) => o.role === 'css-var' && o.scope !== 'library-uncompiled');
md.push(`**CSS custom properties emitted from colour variables:** ${rootVars.length} declarations in ${[...new Set(rootVars.map((o) => o.file.replace(/^sass\//, '')))].join(', ')}.`);
md.push('');
md.push(`**Library files not in this build** that still reference colours: ${Object.entries(fileStats).filter(([, s]) => s.scope === 'library-uncompiled').length} files, ${occUn.length} references (see occurrences.csv, scope \`library-uncompiled\`). They matter for the library update, not for this theme.`);

h('## 11. Scoped colour variables');
md.push('Variables declared inside mixins or blocks with a colour value. They are invisible to the configuration and to the probe above.');
md.push('');
table(['Variable', 'Declared', 'Value'], Object.entries(localColourVars).flatMap(([n, ds]) => ds.map((d) => ['`$' + n + '`', labelOf(d.file).replace(/^sass\//, '') + ':' + d.line, '`' + d.value.slice(0, 80) + '`'])));

fs.writeFileSync(path.join(outDir, 'report.md'), md.join('\n') + '\n');
console.error('Wrote ' + path.relative(theme, outDir) + '/{report.md, occurrences.csv, inventory.json}');
console.error(`Theme: ${themeFiles.length} files, ${occTheme.length} refs. Library compiled: ${libFiles.length} files, ${occLib.length} refs. Colour variables: ${Object.keys(colourVars).length}.`);
