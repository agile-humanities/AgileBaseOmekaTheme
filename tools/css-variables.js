#!/usr/bin/env node
/**
 * css-variables.js — makes the compiled stylesheet take its palette and fonts from CSS variables.
 *
 * WHERE THIS IS USED
 *   It is the output path of the Simplified Agile Base Theme, whose themers work in CSS: its stylesheet is this
 *   tool's output. The Advanced theme builds plain compiled CSS by default — its themers configure the theme system
 *   through the admin and rebuild — and runs this only when asked: `gulp build --variables`.
 *   FUTURE HOME: once stable, this belongs in the stop14-themesystem-legacy library, beside the colour functions
 *   whose output it traces, so every theme built on the library can produce variable-driven CSS the same way.
 *
 * The SASS is not changed. The theme system computes every colour at build time, so the compiled CSS contains
 * finished values. This tool finds out, by experiment, where each of those values came from, and rewrites the
 * stylesheet so that changing a variable in the browser has the same effect as changing the configuration and
 * rebuilding.
 *
 * HOW
 *   1. The styles are compiled once as they are, and once more for every input: each palette colour and font in the
 *      configuration, changed alone. (An "input" is a configuration key whose value is written out, like
 *      clr1: "#00BDD4"; a key that refers to another, like black: $clr8, is not an input, it follows one.)
 *   2. Every colour in the output that moves when an input moves depends on that input, and by how much it moves
 *      gives the proportion. The theme system derives colours by mixing (mix(), neutral(), set-color(), rgba()),
 *      so each one is a blend of inputs and fixed colours, which CSS can express with color-mix().
 *   3. Each such colour is replaced by a variable. The inputs are --colour--1 … --colour--9, --colour--white and
 *      the --font-* variables the theme already exports. Derived colours get their own variable, defined once
 *      from the inputs.
 *
 * WHAT COMES OUT
 *   Colours and fonts that follow the configuration read from variables. Everything else is untouched: sizes and
 *   spacing depend on the modular scale and still need a build.
 *
 *   Old browsers (before color-mix(), early 2023) are safe: every derived variable keeps its built value, and the
 *   definitions that make it follow the inputs sit inside an @supports block. A stylesheet that overrides the
 *   inputs should use the same guard, so those browsers show the built palette throughout:
 *       @supports (color: color-mix(in srgb, red, blue)) { :root { --colour--1: #663399; } }
 *
 * USAGE (from the theme folder; needs the theme's node_modules)
 *   node tools/css-variables.js                 writes asset/css/style.vars.css and a report, changes nothing else
 *   node tools/css-variables.js --write         also replaces asset/css/style.css and style.min.css
 * Derived colour roles — configuration keys written as on-colour() / ensure-contrast() expressions, such as on_impact
 * and brand_primary_on_light — are not linear in the palette, so they are treated as inputs of their own: the rules
 * that use them read var(--colour--on-impact) …, their :root definitions keep the built value, and the admin's
 * palette layer (AgileThemeTools Styling\PaletteCss, or the Simplified theme's layout) recomputes them at run time
 * with the build's own maths when the palette changes.
 *
 *   node tools/css-variables.js --verify        afterwards compiles with a random palette and checks that the
 *                                               variables give the same colours as that real build
 * Options: --css-dir <dir> (default asset/css), --mainconfig <file>, --config <file> (an alternative configuration
 *          layered over the main one, as a site build does; the variables then follow that configuration),
 *          --jobs <n> (default 4), --keep-temp
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const yaml = require('js-yaml');
const postcss = require('postcss');
const valueParser = require('postcss-value-parser');
const colorNames = require('color-name');

const theme = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const flag = (name) => args.includes('--' + name);
const option = (name, fallback) => { const i = args.indexOf('--' + name); return i >= 0 && args[i + 1] ? args[i + 1] : fallback; };

const cssDir = path.resolve(theme, option('css-dir', 'asset/css'));
const mainConfig = path.resolve(theme, option('mainconfig', '_00_main_configuration.yml'));
const altConfig = option('config', null) ? path.resolve(theme, option('config', null)) : null;
const jobs = Math.max(1, parseInt(option('jobs', '4'), 10) || 4);
const SUPPORTS = '(color: color-mix(in srgb, red, blue))';
const STEP = 64;             // how far a colour input is moved, per channel
const TOLERANCE = 0.006;     // how much the three channels may disagree about a proportion

// The font roles of the theme system and the variables the theme exports for them.
const FONT_VARIABLES = { basefont: '--font-base', headingfont: '--font-heading', altfont: '--font-alt', labelfont: '--font-label', listfont: '--font-list', codefont: '--font-code' };

// ---------------------------------------------------------------------------------------------- colours

function parseHex(word) {
  const m = /^#([0-9a-f]{3,8})$/i.exec(word);
  if (!m || ![3, 4, 6, 8].includes(m[1].length)) return null;
  let h = m[1];
  if (h.length <= 4) h = h.split('').map((c) => c + c).join('');
  const n = (i) => parseInt(h.substr(i, 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
}

function parseColourNode(node) {
  if (node.type === 'word') {
    const hex = parseHex(node.value);
    if (hex) return hex;
    const named = colorNames[node.value.toLowerCase()];
    return named ? { r: named[0], g: named[1], b: named[2], a: 1 } : null;
  }
  if (node.type === 'function' && /^hsla?$/i.test(node.value)) {
    // Sass writes some colours with opacity as hsla(), e.g. white at 80%.
    const parts = node.nodes.filter((n) => n.type === 'word').map((n) => n.value);
    if (parts.length < 3) return null;
    const h = ((parseFloat(parts[0]) % 360) + 360) % 360, sat = parseFloat(parts[1]) / 100, light = parseFloat(parts[2]) / 100;
    if ([h, sat, light].some(Number.isNaN)) return null;
    const chroma = (1 - Math.abs(2 * light - 1)) * sat, x = chroma * (1 - Math.abs(((h / 60) % 2) - 1)), m = light - chroma / 2;
    const [r, g, b] = [[chroma, x, 0], [x, chroma, 0], [0, chroma, x], [0, x, chroma], [x, 0, chroma], [chroma, 0, x]][Math.floor(h / 60) % 6];
    let a = 1;
    if (parts.length > 3) a = parts[3].endsWith('%') ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
    return Number.isNaN(a) ? null : { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255, a };
  }
  if (node.type === 'function' && /^rgba?$/i.test(node.value)) {
    const numbers = node.nodes.filter((n) => n.type === 'word').map((n) => n.value);
    if (numbers.length < 3 || numbers.slice(0, 3).some((v) => !/^-?[\d.]+$/.test(v))) return null;
    let a = 1;
    if (numbers.length > 3) a = numbers[3].endsWith('%') ? parseFloat(numbers[3]) / 100 : parseFloat(numbers[3]);
    if (Number.isNaN(a)) return null;
    return { r: parseFloat(numbers[0]), g: parseFloat(numbers[1]), b: parseFloat(numbers[2]), a };
  }
  return null;
}

/** The colours in a declaration value, in order, and the value with each replaced by a placeholder. */
function readValue(value) {
  const parsed = valueParser(value);
  const colours = [];
  const visit = (nodes) => {
    nodes.forEach((node) => {
      if (node.type === 'function' && /^(url|var)$/i.test(node.value)) return;
      const colour = parseColourNode(node);
      if (colour) { colours.push({ node, colour }); return; }
      if (node.type === 'function') visit(node.nodes);
    });
  };
  visit(parsed.nodes);
  const shape = valueParser.stringify(valueParser(value).walk((node) => {
    if (node.type === 'function' && /^(url|var)$/i.test(node.value)) return false;
    if (parseColourNode(node)) { node.type = 'word'; node.value = '§'; node.nodes = undefined; return false; }
    return undefined;
  }).nodes);
  return { parsed, colours, shape };
}

const toHex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const cssColour = (c) => {
  const whole = [c.r, c.g, c.b].every((v) => Math.abs(v - Math.round(v)) < 1e-6);
  if (c.a >= 1) return whole ? toHex(c) : `rgb(${[c.r, c.g, c.b].map((v) => +v.toFixed(3)).join(', ')})`;
  return `rgba(${[c.r, c.g, c.b].map((v) => +v.toFixed(3)).join(', ')}, ${+c.a.toFixed(4)})`;
};
const percent = (fraction) => +(fraction * 100).toFixed(4) + '%';

function moved(colour) {
  const shift = (v) => (v + STEP <= 255 ? v + STEP : v - STEP);
  return { r: shift(colour.r), g: shift(colour.g), b: shift(colour.b), a: 1 };
}

// ---------------------------------------------------------------------------------------------- compiling

function compile(name, overrides, workDir) {
  const dest = path.join(workDir, name);
  const configFile = path.join(workDir, name + '.yml');
  const gulpArgs = [path.join(theme, 'node_modules/gulp/bin/gulp.js'), 'sass', '--dest', dest];
  if (path.basename(mainConfig) !== '_00_main_configuration.yml') gulpArgs.push('--mainconfig', mainConfig);
  if (overrides) {
    fs.writeFileSync(configFile, yaml.dump(overrides, { lineWidth: -1 }));
    gulpArgs.push('--config', configFile);
  }
  return new Promise((resolve, reject) => {
    let output = '';
    const child = spawn(process.execPath, gulpArgs, { cwd: theme });
    child.stdout.on('data', (d) => { output += d; });
    child.stderr.on('data', (d) => { output += d; });
    child.on('close', (code) => {
      const file = path.join(dest, 'css/style.css');
      if (code !== 0 || !fs.existsSync(file)) return reject(new Error(`The styles did not compile for "${name}".\n${output.split('\n').slice(-25).join('\n')}`));
      resolve(fs.readFileSync(file, 'utf8'));
    });
  });
}

async function compileAll(tasks, workDir) {
  const results = {};
  const queue = tasks.slice();
  const worker = async () => {
    while (queue.length) {
      const task = queue.shift();
      results[task.name] = await compile(task.name, task.overrides, workDir);
      process.stdout.write('.');
    }
  };
  await Promise.all(Array.from({ length: Math.min(jobs, tasks.length) }, worker));
  process.stdout.write('\n');
  return results;
}

const declarations = (root) => { const list = []; root.walkDecls((d) => list.push(d)); return list; };

// ---------------------------------------------------------------------------------------------- main

(async () => {
  // The configuration the stylesheet is built from: the main one, with an alternative (site) configuration laid over
  // it when --config is given, exactly as the gulpfile layers them.
  const config = yaml.load(fs.readFileSync(mainConfig, 'utf8'));
  if (altConfig) {
    const alt = yaml.load(fs.readFileSync(altConfig, 'utf8')) || {};
    Object.keys(alt).forEach((key) => { config[key] = alt[key]; });
  }

  // Inputs: configuration keys with a written-out colour, and the font roles with a written-out font list.
  const inputs = [];
  Object.keys(config).forEach((key) => {
    const raw = config[key] === null ? '' : String(config[key]).trim();
    const colour = parseColourNode({ type: 'word', value: raw });
    if (colour && colour.a === 1) {
      const numbered = /^clr(\d+)$/.exec(key);
      inputs.push({ key, kind: 'colour', base: colour, variable: numbered ? `--colour--${numbered[1]}` : `--colour--${key.replace(/_/g, '-')}` });
    } else if (FONT_VARIABLES[key] && raw !== '' && !raw.includes('$')) {
      inputs.push({ key, kind: 'font', base: raw, variable: FONT_VARIABLES[key], sentinel: `Zz${key}sentinel` });
    }
  });
  if (!inputs.length) throw new Error('No colour or font inputs were found in ' + mainConfig);
  inputs.forEach((input) => { if (input.kind === 'colour') input.moved = moved(input.base); });
  // Derived roles: keys whose value is an expression the build evaluates non-linearly. Their built value is read from
  // the base build (the library exports --colour--<role>), or inferred from the rules that use them.
  const roleKeys = Object.keys(config).filter((key) => /\b(ensure-contrast|on-colou?r)\s*\(/.test(String(config[key] ?? '')));
  console.log(`Inputs: ${inputs.map((i) => i.key).join(', ')}${roleKeys.length ? `\nDerived roles: ${roleKeys.join(', ')}` : ''}`);

  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'css-variables-'));
  console.log(`Compiling ${inputs.length + roleKeys.length + 2} variants in ${workDir}`);
  // Each variant is the WHOLE configuration with one value changed, not that value alone: keys that refer to an
  // input (black: $clr8, impact: $clr2) only follow it when they are evaluated again after it.
  const withChanges = (changes) => {
    const whole = {};
    Object.keys(config).forEach((key) => { whole[key] = Object.prototype.hasOwnProperty.call(changes, key) ? changes[key] : config[key]; });
    return whole;
  };
  const tasks = [{ name: 'plain', overrides: null }, { name: 'base', overrides: withChanges({}) }].concat(inputs.map((input) => ({
    name: input.key,
    overrides: withChanges({ [input.key]: input.kind === 'colour' ? toHex(input.moved) : input.sentinel }),
  })));
  const css = await compileAll(tasks, workDir);

  const root = postcss.parse(css.base);
  const baseDecls = declarations(root);

  // The derived roles as inputs. Each is given a probe colour in its variant; a role whose built value is not exported
  // on :root is inferred from the declarations that take the probe colour exactly.
  const rootExports = new Map();
  baseDecls.forEach((d) => { if (d.prop.startsWith('--') && /^(:root|html)$/.test(d.parent.selector || '')) { const c = parseColourNode(valueParser(d.value).nodes[0] || { type: 'word', value: '' }); if (c && !rootExports.has(d.prop)) rootExports.set(d.prop, c); } });
  const roleInputs = roleKeys.map((key, i) => ({ key, kind: 'colour', role: true, variable: `--colour--${key.replace(/_/g, '-')}`, base: null, moved: { r: 17 + i, g: 203 - i, b: 89 + 2 * i, a: 1 } }));
  roleInputs.forEach((input) => { if (rootExports.has(input.variable)) input.base = rootExports.get(input.variable); });
  if (roleInputs.length) {
    const roleCss = await compileAll(roleInputs.map((input) => ({ name: input.key, overrides: withChanges({ [input.key]: toHex(input.moved) }) })), workDir);
    roleInputs.forEach((input) => {
      css[input.key] = roleCss[input.key];
      if (input.base) return;
      const decls = declarations(postcss.parse(roleCss[input.key]));
      const probe = toHex(input.moved);
      const bases = new Set();
      decls.forEach((d, i) => { if (baseDecls[i] && d.prop === baseDecls[i].prop && d.value !== baseDecls[i].value && d.value.toLowerCase().includes(probe)) { const b = readValue(baseDecls[i].value), v = readValue(d.value); v.colours.forEach((t, j) => { if (toHex(t.colour) === probe && b.colours[j]) bases.add(cssColour(b.colours[j].colour)); }); } });
      if (bases.size === 1) input.base = readValue([...bases][0]).colours[0].colour;
    });
    const unused = roleInputs.filter((i) => !i.base);
    unused.forEach((i) => console.log(`  (${i.key} is not used by any rule and not exported; left out)`));
    roleInputs.filter((i) => i.base).forEach((i) => inputs.push(i));
  }
  const variants = {};
  inputs.forEach((input) => {
    const decls = declarations(postcss.parse(css[input.key]));
    const same = decls.length === baseDecls.length && decls.every((d, i) => d.prop === baseDecls[i].prop);
    variants[input.key] = same ? decls : null;
  });

  const report = { inputs: inputs.map((i) => ({ key: i.key, variable: i.variable, kind: i.kind })), warnings: [], structural: [], unexplained: [], derived: [], counts: {} };
  // The configuration evaluated once (a plain build) and twice (as a site build does) must give the same stylesheet.
  // When they differ, a key is used before the line that defines it, and a plain build takes the library's default.
  if (css.plain !== css.base) {
    report.warnings.push('The configuration gives a different stylesheet when it is evaluated a second time. A key refers to another key that is defined further down the file; move the definition above its first use. The stylesheet written here uses the second evaluation.');
  }
  inputs.forEach((input) => { if (!variants[input.key]) report.structural.push(`Changing ${input.key} changes which rules are generated, not only their values. It is left out.`); });
  const usable = inputs.filter((input) => variants[input.key]).sort((a, b) => (b.role ? 1 : 0) - (a.role ? 1 : 0)); // roles first
  const roleVariables = new Set(inputs.filter((i) => i.role).map((i) => i.variable));

  // ---- 1. for every colour in every declaration: which inputs does it follow, and in what proportion?
  const models = new Map();       // signature -> { terms, constant, alpha, uses, names }
  const sites = [];               // { decl, token, signature } in document order
  const fontSites = [];
  const counts = { declarations: baseDecls.length, colours: 0, followInputs: 0, direct: 0, mixed: 0, fonts: 0, fixed: 0, roleDefinitions: 0 };

  baseDecls.forEach((decl, index) => {
    const base = readValue(decl.value);
    const weights = base.colours.map(() => ({}));
    const claimed = base.colours.map(() => false);
    let trouble = null;

    // The :root definition of a derived role keeps its built value: the run-time layer redefines it.
    if (roleVariables.has(decl.prop) && /^(:root|html)$/.test(decl.parent.selector || '')) { counts.roleDefinitions++; counts.colours += base.colours.length; counts.fixed += base.colours.length; return; }

    usable.forEach((input) => {
      const other = variants[input.key][index];
      if (other.value === decl.value) return;
      if (!input.role && claimed.every(Boolean) && claimed.length) return; // every colour here is a role: the palette moves it only through the role
      if (input.kind === 'font') {
        // The sentinel stands where the font list stood: what surrounds it must be unchanged.
        const sentinel = input.sentinel;
        const from = other.value.indexOf(sentinel);
        if (from >= 0 && other.value.indexOf(sentinel, from + 1) < 0) {
          const before = other.value.slice(0, from), after = other.value.slice(from + sentinel.length);
          if (decl.value.length >= before.length + after.length && decl.value.startsWith(before) && decl.value.endsWith(after)) {
            fontSites.push({ decl, input, before, after });
            return;
          }
        }
        trouble = `follows ${input.key} in a way that could not be read`;
        return;
      }
      const variant = readValue(other.value);
      if (variant.shape !== base.shape || variant.colours.length !== base.colours.length) {
        trouble = `changes shape when ${input.key} changes`;
        return;
      }
      base.colours.forEach((token, t) => {
        const a = token.colour, b = variant.colours[t].colour;
        if (a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a) return;
        if (claimed[t]) return; // follows a derived role exactly; the palette's effect on it goes through the role
        if (Math.abs(a.a - b.a) > 1e-6) { trouble = `changes opacity when ${input.key} changes`; return; }
        const w = ['r', 'g', 'b'].map((ch) => (b[ch] - a[ch]) / (input.moved[ch] - input.base[ch]));
        const mean = (w[0] + w[1] + w[2]) / 3;
        if (w.some((v) => Math.abs(v - mean) > TOLERANCE) || mean < -TOLERANCE || mean > 1 + TOLERANCE) {
          trouble = `follows ${input.key}, but not as a simple mix (${w.map((v) => v.toFixed(3)).join(', ')})`;
          return;
        }
        weights[t][input.key] = Math.min(1, Math.max(0, mean));
        if (input.role && Math.abs(mean - 1) <= TOLERANCE) { weights[t] = { [input.key]: 1 }; claimed[t] = true; }
      });
    });

    counts.colours += base.colours.length;
    if (trouble) {
      report.unexplained.push({ selector: decl.parent.selector || decl.parent.name || '', declaration: `${decl.prop}: ${decl.value}`.slice(0, 160), why: trouble });
      return;
    }

    base.colours.forEach((token, t) => {
      const keys = Object.keys(weights[t]).filter((k) => weights[t][k] > TOLERANCE);
      if (!keys.length) { counts.fixed++; return; }
      // Round the proportions; what is left over belongs to a fixed colour.
      const terms = keys.map((k) => ({ key: k, weight: Math.round(weights[t][k] * 10000) / 10000 })).sort((x, y) => (x.key < y.key ? -1 : 1));
      const total = terms.reduce((sum, term) => sum + term.weight, 0);
      if (total > 1 + TOLERANCE) {
        report.unexplained.push({ selector: decl.parent.selector || '', declaration: `${decl.prop}: ${decl.value}`.slice(0, 160), why: 'proportions add up to more than the whole' });
        return;
      }
      let constant = null;
      const rest = 1 - total;
      if (rest > TOLERANCE) {
        constant = { weight: Math.round(rest * 10000) / 10000 };
        ['r', 'g', 'b'].forEach((ch) => {
          const fromInputs = terms.reduce((sum, term) => sum + term.weight * usable.find((i) => i.key === term.key).base[ch], 0);
          constant[ch] = Math.min(255, Math.max(0, Math.round((token.colour[ch] - fromInputs) / rest)));
        });
      }
      const alpha = Math.round(token.colour.a * 10000) / 10000;
      const signature = JSON.stringify([terms, constant, alpha]);
      if (!models.has(signature)) models.set(signature, { terms, constant, alpha, uses: 0, names: [], built: token.colour });
      const model = models.get(signature);
      model.uses++;
      counts.followInputs++;
      sites.push({ decl, index: t, signature });
    });
  });

  // ---- 2. a variable for every model
  const variableOf = (key) => inputs.find((i) => i.key === key).variable;
  const isInputItself = (model) => model.terms.length === 1 && model.terms[0].weight === 1 && !model.constant && model.alpha === 1;

  // Variables the stylesheet already declares on :root for a derived colour (the library's --colour--neutral--20,
  // --colour--black …) keep their names. A declaration whose value is exactly one such colour names its model.
  const declaredOn = new Map();   // variable -> [declarations]
  const builtRootValues = new Map();   // variable -> value as built, in document order (for the themer stylesheet)
  baseDecls.forEach((decl) => {
    if (!decl.prop.startsWith('--') || !/^(:root|html)$/.test(decl.parent.selector || '')) return;
    if (!declaredOn.has(decl.prop)) declaredOn.set(decl.prop, []);
    declaredOn.get(decl.prop).push(decl);
    if (!builtRootValues.has(decl.prop)) builtRootValues.set(decl.prop, decl.value);
  });
  const inputVariables = new Set(inputs.map((i) => i.variable));
  sites.forEach((site) => {
    const { decl } = site;
    if (!decl.prop.startsWith('--') || !declaredOn.has(decl.prop) || inputVariables.has(decl.prop)) return;
    const value = readValue(decl.value);
    if (value.colours.length === 1 && value.shape.trim() === '§' && declaredOn.get(decl.prop).length === 1) {
      const model = models.get(site.signature);
      if (!isInputItself(model) && !model.names.includes(decl.prop)) model.names.push(decl.prop);
    }
  });

  const expression = (model) => {
    const parts = model.terms.map((term) => ({ css: `var(${variableOf(term.key)})`, weight: term.weight }));
    if (model.constant) parts.push({ css: toHex(model.constant), weight: model.constant.weight });
    const mix = (list) => {
      if (list.length === 1) return list[0].css;
      const total = list.reduce((sum, p) => sum + p.weight, 0);
      return `color-mix(in srgb, ${list[0].css} ${percent(list[0].weight / total)}, ${mix(list.slice(1))})`;
    };
    const opaque = mix(parts);
    return model.alpha < 1 ? `color-mix(in srgb, ${opaque} ${percent(model.alpha)}, transparent)` : opaque;
  };

  let counter = 0;
  const generated = [];           // { name, model } for names this tool invents
  models.forEach((model) => {
    if (isInputItself(model)) { model.variable = variableOf(model.terms[0].key); return; }
    if (model.names.length) { model.variable = model.names[0]; return; }
    model.variable = `--colour--derived-${++counter}`;
    generated.push({ name: model.variable, model });
  });

  // ---- 3. rewrite: every colour that follows the inputs becomes a variable
  const byDecl = new Map();
  sites.forEach((site) => { if (!byDecl.has(site.decl)) byDecl.set(site.decl, []); byDecl.get(site.decl).push(site); });
  byDecl.forEach((list, decl) => {
    const value = readValue(decl.value);
    let changed = false;
    list.forEach((site) => {
      const model = models.get(site.signature);
      // The declaration that defines an input, or a named derived colour, stays as built: it is the fallback.
      if (inputVariables.has(decl.prop) && isInputItself(model) && decl.prop === model.variable) return;
      if (decl.prop.startsWith('--') && model.names.includes(decl.prop)) return;
      const target = value.colours[site.index];
      target.node.type = 'word';
      target.node.value = `var(${model.variable})`;
      target.node.nodes = undefined;
      changed = true;
      if (isInputItself(model)) counts.direct++; else counts.mixed++;
    });
    if (changed) decl.value = valueParser.stringify(value.parsed.nodes);
  });

  fontSites.forEach(({ decl, input, before, after }) => {
    if (decl.prop === input.variable) return;                    // the input's own declaration
    decl.value = `${before}var(${input.variable})${after}`;
    counts.fonts++;
  });

  // ---- 4. the definitions: built values first (for every browser), then how each follows the inputs.
  const missingInputs = inputs.filter((input) => input.kind === 'colour' && !declaredOn.has(input.variable));
  counts.roles = inputs.filter((i) => i.role).length;
  const fallbackLines = ['  --agile-css-variables: 1; /* marker: this stylesheet reads its palette and fonts from variables */']
    .concat(missingInputs.map((input) => `  ${input.variable}: ${toHex(input.base)};`))
    .concat(generated.map(({ name, model }) => `  ${name}: ${cssColour(model.built)};`));
  const liveLines = [];
  models.forEach((model) => { if (!isInputItself(model)) (model.names.length ? model.names : [model.variable]).forEach((name) => liveLines.push(`  ${name}: ${expression(model)};`)); });
  const block = [
    '',
    '/* ---- Generated by tools/css-variables.js. Colours that follow the palette: built values, then how each is made',
    '        from the palette variables. Override --colour--1 … and --font-* to restyle without a build. ---- */',
    `:root {\n${fallbackLines.join('\n')}\n}`,
    `@supports ${SUPPORTS} {\n  :root {\n${liveLines.map((l) => '  ' + l).join('\n')}\n  }\n}`,
    '',
  ].join('\n');

  const output = root.toString() + block;
  models.forEach((model) => report.derived.push({ variable: model.names.length ? model.names.join(', ') : model.variable, made_from: isInputItself(model) ? '(the input itself)' : expression(model), built_value: cssColour(model.built), uses: model.uses }));
  report.counts = counts;

  // ---- the stylesheet for themers: every variable, what it is for, and which ones are worth changing
  function themerStylesheet() {
    const themeName = (() => { try { return /^name\s*=\s*"([^"]*)"/m.exec(fs.readFileSync(path.join(theme, 'config/theme.ini'), 'utf8'))[1]; } catch (e) { return path.basename(theme); } })();
    const inputUses = {};
    models.forEach((model) => { if (isInputItself(model)) inputUses[model.terms[0].key] = (inputUses[model.terms[0].key] || 0) + model.uses; });
    const usedBy = (key) => Object.keys(config).filter((k) => k !== key && new RegExp(`\\$${key}\\b`).test(String(config[k] ?? ''))).map((k) => `$${k}`);
    const lines = [];
    const out = (l = '') => lines.push(l);
    const comment = (text, indent = '  ') => text.split('\n').forEach((t) => out(`${indent}/* ${t} */`));

    out(`/* ${themeName} — variables for themers`);
    out(' *');
    out(' * The theme\'s stylesheet reads its colours and fonts from the CSS variables below, so a site can be restyled');
    out(' * with a few lines of CSS and no build: put new values for the PALETTE and FONTS in a stylesheet loaded after');
    out(' * the theme\'s (the "Custom CSS" fields in the site\'s settings do this), inside the same @supports block.');
    out(' *');
    out(' * This file is a copy of the built values with notes. Loading it changes nothing. Copy the lines you want.');
    out(` * Generated by tools/css-variables.js from ${path.basename(mainConfig)}. */`);
    out();
    out(`@supports ${SUPPORTS} {`);
    out('  :root {');
    out();
    comment('PALETTE — change these. Every derived colour below follows them.');
    out();
    inputs.filter((i) => i.kind === 'colour' && !i.role).forEach((input) => {
      const roles = usedBy(input.key);
      const notes = [];
      if (roles.length) notes.push(`the configuration\'s ${roles.join(', ')}`);
      notes.push(`used as is ${inputUses[input.key] || 0} times`);
      out(`    ${input.variable}: ${toHex(input.base)};${' '.repeat(Math.max(1, 34 - input.variable.length - toHex(input.base).length))}/* ${input.key}: ${notes.join('; ')} */`);
    });
    out();
    if (inputs.some((i) => i.role)) {
      comment('DERIVED ROLES — text colours the build worked out from the palette by rule (legibility), not by proportion: a brand colour\nas it is when it reads on its surface, otherwise darkened or lightened until it does. The admin\'s palette layer recomputes\nthem when the palette changes. Set one here only to pin it.');
      out();
      inputs.filter((i) => i.role).forEach((input) => {
        out(`    ${input.variable}: ${cssColour(input.base)};${' '.repeat(Math.max(1, 46 - input.variable.length - cssColour(input.base).length))}/* ${input.key}: ${String(config[input.key]).trim()} */`);
      });
      out();
    }
    comment('FONTS — change these. A family must be available to the browser: a system font, a font the theme bundles, or one loaded by your own @import or <link>.');
    out();
    inputs.filter((i) => i.kind === 'font').forEach((input) => {
      const roles = usedBy(input.key);
      out(`    ${input.variable}: ${builtRootValues.get(input.variable) || input.base};${roles.length ? `  /* ${input.key}; also ${roles.join(', ')} */` : `  /* ${input.key} */`}`);
    });
    inputs.filter((i) => i.kind === 'font').forEach((input) => {
      // Font roles defined as another role (labelfont: $basefont) follow it; say so.
      Object.keys(FONT_VARIABLES).forEach((role) => {
        if (String(config[role] ?? '').trim() === `$${input.key}` && builtRootValues.has(FONT_VARIABLES[role])) {
          out(`    /* ${FONT_VARIABLES[role]} follows ${input.variable} (${role}: $${input.key}); set it only to separate them. */`);
        }
      });
    });
    out();
    out('  }');
    out('}');
    out();
    out('/* DERIVED COLOURS — made from the palette; they follow it on their own. Override one only to break that link.');
    out(' * Built value, then how it is made. The number is how often the stylesheet uses it. */');
    out('/*');
    models.forEach((model) => {
      if (isInputItself(model)) return;
      (model.names.length ? model.names : [model.variable]).forEach((name) => {
        out(`  ${name}: ${cssColour(model.built)};${' '.repeat(Math.max(1, 56 - name.length - cssColour(model.built).length))}${model.uses} × — ${expression(model)}`);
      });
    });
    out('*/');
    out();
    const known = new Set([...inputs.map((i) => i.variable), ...[...models.values()].flatMap((m) => m.names.length ? m.names : [m.variable])]);
    const groups = [
      ['SIZING — the modular scale as the theme built it (spacing and type steps, widths, heights). Read them in your own CSS: changing them here does not change the theme\'s own rules, which have the values compiled in.', /^--(space|type|scale|line-height|max-width|legible-width|masthead|ui-|font-size|grid)/],
      ['OTHER VARIABLES the stylesheet declares (breakpoints, the library\'s palette shades, …). Informational.', /./],
    ];
    const remaining = [...builtRootValues.entries()].filter(([name]) => !known.has(name));
    groups.forEach(([title, pattern]) => {
      const members = remaining.filter(([name]) => pattern.test(name));
      if (!members.length) return;
      out(`/* ${title} */`);
      out('/*');
      members.forEach(([name, value]) => { out(`  ${name}: ${value};`); remaining.splice(remaining.findIndex(([n]) => n === name), 1); });
      out('*/');
      out();
    });
    return lines.join('\n') + '\n';
  }

  // ---- 5. write
  fs.mkdirSync(cssDir, { recursive: true });
  fs.writeFileSync(path.join(cssDir, 'style.vars.css'), output);
  fs.writeFileSync(path.join(cssDir, 'theme-variables.css'), themerStylesheet());
  fs.writeFileSync(path.join(cssDir, 'style.vars.report.json'), JSON.stringify(report, null, 2));
  let minified = null;
  if (flag('write')) {
    // The same minifier settings as the gulpfile's cssPlugins, so style.min.css is made the way a build makes it.
    const autoprefixer = require('autoprefixer');
    const cssnano = require('cssnano');
    minified = (await postcss([autoprefixer({ cascade: true, remove: true }), cssnano({ discardComments: { removeAll: true } })]).process(output, { from: undefined })).css;
    fs.writeFileSync(path.join(cssDir, 'style.css'), output);
    fs.writeFileSync(path.join(cssDir, 'style.min.css'), minified);
  }

  console.log(`\nDeclarations: ${counts.declarations}. Colours found: ${counts.colours}.`);
  console.log(`  follow the palette: ${counts.followInputs}  (${counts.direct} a palette colour as it is, ${counts.mixed} a mix)`);
  console.log(`  fixed (do not follow any input): ${counts.fixed}${counts.roleDefinitions ? ` (of which ${counts.roleDefinitions} are the built values of derived roles)` : ''}`);
  if (counts.roles) console.log(`  derived roles treated as inputs: ${counts.roles}`);
  console.log(`  font declarations now reading a variable: ${counts.fonts}`);
  console.log(`  derived colours: ${[...models.values()].filter((m) => !isInputItself(m)).length} (${generated.length} newly named)`);
  if (report.warnings.length) console.log('  ! ' + report.warnings.join('\n  ! '));
  if (report.structural.length) console.log('  ! ' + report.structural.join('\n  ! '));
  console.log(`  could not be explained: ${report.unexplained.length}${report.unexplained.length ? ' (see the report)' : ''}`);
  console.log(`Written: ${path.relative(theme, path.join(cssDir, 'style.vars.css'))} (${output.length} bytes; built stylesheet ${css.base.length}), theme-variables.css${flag('write') ? ', style.css, style.min.css' : ''}`);

  // ---- 6. verify against a real build with another palette
  if (flag('verify')) {
    const palette = {};
    const colourInputs = usable.filter((i) => i.kind === 'colour'); // includes the derived roles: as literals they override their expressions
    colourInputs.forEach((input) => { palette[input.key] = { r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256), a: 1 }; });
    const overrides = {};
    colourInputs.forEach((input) => { overrides[input.key] = toHex(palette[input.key]); });
    console.log(`\nVerifying against a real build with a random palette: ${Object.values(overrides).join(' ')}`);
    const real = declarations(postcss.parse((await compileAll([{ name: 'verify', overrides: withChanges(overrides) }], workDir)).verify));
    const predict = (model) => {
      const out = { r: 0, g: 0, b: 0, a: model.alpha };
      ['r', 'g', 'b'].forEach((ch) => {
        out[ch] = model.terms.reduce((sum, term) => sum + term.weight * palette[term.key][ch], 0) + (model.constant ? model.constant.weight * model.constant[ch] : 0);
      });
      return out;
    };
    let checked = 0, worst = 0, wrong = 0;
    if (real.length !== baseDecls.length) {
      console.log('  The random palette changes which rules are generated; nothing could be compared.');
    } else {
      const position = new Map(baseDecls.map((d, i) => [d, i]));
      byDecl.forEach((list, decl) => {
        const realValue = readValue(real[position.get(decl)].value);
        list.forEach((site) => {
          const actual = realValue.colours[site.index] && realValue.colours[site.index].colour;
          if (!actual) { wrong++; return; }
          const expected = predict(models.get(site.signature));
          const error = Math.max(Math.abs(actual.r - expected.r), Math.abs(actual.g - expected.g), Math.abs(actual.b - expected.b), Math.abs(actual.a - expected.a) * 255);
          checked++; worst = Math.max(worst, error);
          if (error > 1.5) wrong++;
        });
      });
      console.log(`  ${checked} colours compared; ${wrong} differ by more than 1.5 of 255; largest difference ${worst.toFixed(2)}.`);
      report.verification = { palette: overrides, compared: checked, different: wrong, largest_difference: +worst.toFixed(3) };
      fs.writeFileSync(path.join(cssDir, 'style.vars.report.json'), JSON.stringify(report, null, 2));
      if (wrong) process.exitCode = 1;
    }
  }

  if (!flag('keep-temp')) fs.rmSync(workDir, { recursive: true, force: true });
})().catch((error) => { console.error(error.message || error); process.exit(1); });
