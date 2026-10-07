#!/usr/bin/env node
/**
 * build-simplified.js — generates the Simplified Agile Base Theme from this theme.
 *
 * The Simplified theme is not maintained by hand (generic requirements, decision 9 and D6/D7): everything in it is
 * produced here from the Advanced theme's own sources, so a change here is a change there at the next run.
 *
 *   1. Build this theme with `gulp build --variables` into a scratch folder: the compiled stylesheet with its palette
 *      and fonts read from CSS variables (tools/css-variables.js), plus scripts, fonts and images.
 *   2. Copy that build into the Simplified theme's asset/ folder.
 *   3. Copy a subset of the templates — the ones for core Omeka pages and core blocks — rewriting the few lines that
 *      depend on the Agile Theme Tools module or on other modules (per-site asset URLs, the module's value and
 *      property helpers, Advanced Search's search pages) into plain Omeka equivalents. Every rewrite is a listed,
 *      exact replacement; the generator refuses to write a template that still names a module helper, so the result
 *      is guaranteed to run on a stock Omeka install.
 *   4. Write theme.ini from simplified/theme.ini (version synced with this theme), README.md, a custom.css for the
 *      themer if none exists, and GENERATED.json describing the run.
 *
 *   node tools/build-simplified.js                       # build, then generate into ../AgileBaseOmekaThemeSimplified
 *   node tools/build-simplified.js --target <dir>        # generate elsewhere
 *   node tools/build-simplified.js --from <asset dir>    # skip the build; use an existing --variables build
 *   node tools/build-simplified.js --templates-only      # skip the build and the asset copy (template work only)
 *   node tools/build-simplified.js --container <name>    # run the build inside that Docker container (the theme
 *                                                        # must be mounted at /var/www/html/themes/<folder> there),
 *                                                        # for machines where the local gulp build cannot run
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const theme = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const opt = (name, fallback) => { const i = args.indexOf('--' + name); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback; };
const flag = (name) => args.includes('--' + name);

const target = path.resolve(theme, opt('target', path.join('..', 'AgileBaseOmekaThemeSimplified')));
const simplifiedSrc = path.join(theme, 'simplified');
const templatesOnly = flag('templates-only');
const fromDir = opt('from', null) ? path.resolve(theme, opt('from')) : null;

const log = (s) => console.error(s);
const fail = (s) => { console.error('ERROR: ' + s); process.exit(1); };

if (!fs.existsSync(path.join(simplifiedSrc, 'theme.ini'))) fail('Missing ' + path.relative(theme, path.join(simplifiedSrc, 'theme.ini')));
fs.mkdirSync(target, { recursive: true });

// ---------------------------------------------------------------------------------------------------------------
// Templates to carry over: core Omeka pages and core blocks only. Module overrides (Advanced Search pages, Agile
// blocks, resource-page blocks, Mirador, Universal Viewer, Mapping) stay in the Advanced theme.

const TEMPLATES = [
  'layout/layout.phtml',
  'agile-item/card.phtml',
  'common/search-form.phtml',
  'common/linked-resources.phtml',
  'common/pagination.phtml',
  'common/pagination-mini.phtml',
  'common/resource-values.phtml',
  'common/site-page-pagination.phtml',
  'common/sort-selector.phtml',
  'common/block-layout/asset.phtml',
  'common/block-layout/browse-preview.phtml',
  'common/block-layout/item-with-metadata.phtml',
  'common/block-layout/line-break.phtml',
  'common/block-layout/page-date-time.phtml',
  'omeka/site/index/search.phtml',
  'omeka/site/item/browse.phtml',
  'omeka/site/page/show.phtml',
];

// Exact replacements. `files` limits a rule to those templates; a rule listed for a file MUST match there, so a
// change in the Advanced template that breaks the rewrite is caught instead of silently shipping module code.
const shim = (name) => fs.readFileSync(path.join(simplifiedSrc, 'shims', name + '.php'), 'utf8').trim();
const REWRITES = [
  // The module's per-site asset resolver → the theme's own assets.
  { from: "$siteAssetUrl = $this->plugin('siteAssetUrl');", to: "$siteAssetUrl = $this->plugin('assetUrl'); // Simplified theme: its own assets, no per-site builds", files: ['layout/layout.phtml'] },
  { from: "$assetUrl = $plugins->get('siteAssetUrl');", to: "$assetUrl = $this->plugin('assetUrl');", files: ['agile-item/card.phtml'] },
  // Google fonts from the module's styling form → palette and fonts from this theme's own settings.
  { from: "$this->themeFonts()->inject(); // Google fonts chosen in Theme > Configure theme styles, before the stylesheets.", to: shim('palette-style'), files: ['layout/layout.phtml'] },
  // The module's custom-CSS layers, only when the module is there.
  { from: "$this->customCss()->inject();", to: "if ($this->getHelperPluginManager()->has('customCss')) { $this->customCss()->inject(); } // Agile Theme Tools CSS layers, when the module is present", files: ['layout/layout.phtml'] },
  // Module view helpers → inline equivalents (simplified/shims/*.php).
  { from: "$this->plugin('sitePartial')", to: "$this->plugin('partial')" },
  { from: "$this->plugin('valueDisplay')", to: shim('valueDisplay') },
  { from: "$this->plugin('textSummary')", to: shim('textSummary') },
  { from: "$this->plugin('propertyTerms')", to: shim('propertyTerms') },
  { from: "$searchHelper = $this->plugin('agileSearchHelper');", to: "$searchHelper = null;", files: ['agile-item/card.phtml'] },
  { from: "$itemSet = $this->plugin('itemSetFacetHandler')->getItemSetById($id);", to: "$itemSet = $this->api()->searchOne('item_sets', ['id' => $id])->getContent();", files: ['common/search-form.phtml'] },
  // Advanced Search's main search page → core item browse with full-text search.
  { from: "$searchConfig = $this->api()->searchOne('search_configs', ['id' => $searchMainPage])->getContent();", to: "$searchConfig = null; // Simplified theme: no Advanced Search", files: ['common/search-form.phtml', 'common/block-layout/browse-preview.phtml'] },
  { from: "$searchAction = isset($searchAction) ? $searchAction : ($searchConfig ? $searchConfig->siteUrl() : '#');", to: "$searchAction = isset($searchAction) ? $searchAction : $this->url('site/resource', ['controller' => 'item', 'action' => 'browse'], [], true);", files: ['common/search-form.phtml'] },
  { from: "$searchValue = $this->escapeHtml($this->params()->fromQuery('q', ''));\n        $name='q';", to: "$searchValue = $this->escapeHtml($this->params()->fromQuery('fulltext_search', ''));\n        $name = 'fulltext_search';", files: ['common/search-form.phtml'] },
  { from: "href=\"<?= $searchConfig->siteUrl() ?>\"", to: "href=\"<?= $this->url('site/resource', ['controller' => $this->resourceType, 'action' => 'browse'], ['query' => $this->query], true) ?>\"", files: ['common/block-layout/browse-preview.phtml'] },
];

// Anything still naming a module after the rewrites stops the generation.
const helperCall = (name) => new RegExp("(plugin|get)\\('" + name + "'\\)|->" + name + "\\(");
const FORBIDDEN = [
  helperCall('siteAssetUrl'), helperCall('sitePartial'), helperCall('themeFonts'), helperCall('valueDisplay'), helperCall('propertyTerms'),
  helperCall('textSummary'), helperCall('agileSearchHelper'), helperCall('itemSetFacetHandler'), helperCall('dateHandler'), helperCall('pageSlug'),
  helperCall('siteHelper'), helperCall('universalViewer'), helperCall('searchQuickReplacement'), helperCall('mirador'), helperCall('iiifServer'),
  /'search_configs'/, /advancedsearch_main_config_replace/,
  { re: helperCall('customCss'), unless: /has\('customCss'\)/ },
];
const isComment = (line) => /^\s*(\/\/|\*|\/\*)/.test(line);

// ---------------------------------------------------------------------------------------------------------------
// 1. Build

let builtAssets = fromDir;
let scratch = null;
const container = opt('container', null);
if (!templatesOnly && !builtAssets) {
  let r;
  if (container) {
    // Build inside the container, into a folder under the theme so the host sees it through the bind mount.
    scratch = path.join(theme, '.simplified-build');
    fs.rmSync(scratch, { recursive: true, force: true });
    const inContainer = '/var/www/html/themes/' + path.basename(theme);
    log('Building the Advanced theme with CSS variables in container ' + container + ' …');
    r = spawnSync('docker', ['exec', '-w', inContainer, container, 'node', 'node_modules/gulp/bin/gulp.js', 'build', '--variables', '--dest', inContainer + '/.simplified-build'], { stdio: ['ignore', 'pipe', 'pipe'] });
  } else {
    scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'agile-simplified-'));
    log('Building the Advanced theme with CSS variables into ' + scratch + ' …');
    r = spawnSync(process.execPath, [path.join(theme, 'node_modules', 'gulp', 'bin', 'gulp.js'), 'build', '--variables', '--dest', scratch], { cwd: theme, stdio: ['ignore', 'pipe', 'pipe'] });
  }
  if (r.status !== 0) fail('The build failed' + (container ? '' : ' (if the local gulp build cannot run on this machine, use --container <docker container>)') + ':\n' + String(r.stdout).split('\n').slice(-20).join('\n') + '\n' + String(r.stderr).slice(-2000));
  builtAssets = scratch;
}
if (!templatesOnly) {
  const css = path.join(builtAssets, 'css', 'style.min.css');
  if (!fs.existsSync(css)) fail('No stylesheet at ' + css);
  if (!fs.readFileSync(css, 'utf8').includes('--agile-css-variables')) fail('The stylesheet at ' + css + ' is a plain build; the Simplified theme needs a --variables build.');
}

// ---------------------------------------------------------------------------------------------------------------
// 2. Assets

function copyDir(src, dst, skip) {
  fs.mkdirSync(dst, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    if (skip && skip(name, src)) continue;
    const s = path.join(src, name), d = path.join(dst, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d, skip); else fs.copyFileSync(s, d);
  }
}
const written = [];
if (!templatesOnly) {
  fs.rmSync(path.join(target, 'asset'), { recursive: true, force: true });
  copyDir(builtAssets, path.join(target, 'asset'), (name) => name === '.DS_Store' || /^style\.vars\./.test(name) || /\.map$/.test(name));
  written.push('asset/');
  log('Assets copied.');
}

// ---------------------------------------------------------------------------------------------------------------
// 3. Templates

const out = {};
const problems = [];
for (const rel of TEMPLATES) {
  const src = path.join(theme, 'view', rel);
  if (!fs.existsSync(src)) { problems.push(rel + ': missing in the Advanced theme'); continue; }
  let text = fs.readFileSync(src, 'utf8');
  for (const rule of REWRITES) {
    const applies = !rule.files || rule.files.includes(rel);
    if (!applies) continue;
    if (!text.includes(rule.from)) {
      if (rule.files) problems.push(rel + ': expected line not found, the Advanced template changed:\n      ' + rule.from.split('\n')[0]);
      continue;
    }
    text = text.split(rule.from).join(rule.to);
  }
  for (const f of FORBIDDEN) {
    const re = f.re || f, unless = f.unless;
    text.split('\n').forEach((line, i) => {
      if (!isComment(line) && re.test(line) && !(unless && unless.test(line))) problems.push(rel + ':' + (i + 1) + ': still depends on a module: ' + line.trim().slice(0, 100));
    });
  }
  out[rel] = '<?php /* Generated from the Advanced Agile Base Theme by tools/build-simplified.js — edit the source there, not this file. */ ?>\n' + text;
}
if (problems.length) fail('Templates not generated:\n  ' + problems.join('\n  '));

fs.rmSync(path.join(target, 'view'), { recursive: true, force: true });
for (const [rel, text] of Object.entries(out)) {
  const dst = path.join(target, 'view', rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, text);
  written.push('view/' + rel);
}
log(Object.keys(out).length + ' templates generated.');

// ---------------------------------------------------------------------------------------------------------------
// 4. theme.ini, README, custom.css, LICENSE, manifest

const advancedIni = fs.readFileSync(path.join(theme, 'config', 'theme.ini'), 'utf8');
const iniValue = (ini, key) => { const m = ini.match(new RegExp('^' + key + '\\s*=\\s*"([^"]*)"', 'm')); return m ? m[1] : null; };
const version = iniValue(advancedIni, 'version') || '0.0.0';
let ini = fs.readFileSync(path.join(simplifiedSrc, 'theme.ini'), 'utf8');
ini = ini.replace(/^version\s*=\s*"[^"]*"/m, 'version = "' + version + '"').replace(/^agile_base_version\s*=\s*"[^"]*"/m, 'agile_base_version = "' + version + '"');
fs.mkdirSync(path.join(target, 'config'), { recursive: true });
fs.writeFileSync(path.join(target, 'config', 'theme.ini'), ini);
written.push('config/theme.ini');

fs.writeFileSync(path.join(target, 'README.md'), fs.readFileSync(path.join(simplifiedSrc, 'README.md'), 'utf8').replace(/\{\{version\}\}/g, version));
written.push('README.md');
if (!fs.existsSync(path.join(target, 'LICENSE.txt')) && fs.existsSync(path.join(theme, 'LICENSE.txt'))) { fs.copyFileSync(path.join(theme, 'LICENSE.txt'), path.join(target, 'LICENSE.txt')); written.push('LICENSE.txt'); }
if (!fs.existsSync(path.join(target, 'custom.css'))) {
  fs.writeFileSync(path.join(target, 'custom.css'), fs.readFileSync(path.join(simplifiedSrc, 'custom.css'), 'utf8'));
  written.push('custom.css (new; never overwritten)');
}
if (!fs.existsSync(path.join(target, 'custom.js'))) fs.writeFileSync(path.join(target, 'custom.js'), '// Your own scripts for this theme. Loaded after the theme\'s scripts.\n');

let commit = null;
try { commit = String(spawnSync('git', ['rev-parse', 'HEAD'], { cwd: theme }).stdout).trim() || null; } catch (e) { /* no git */ }
fs.writeFileSync(path.join(target, 'GENERATED.json'), JSON.stringify({ generatedAt: new Date().toISOString(), source: 'AgileBaseOmekaTheme', sourceVersion: version, sourceCommit: commit, generator: 'tools/build-simplified.js', templates: Object.keys(out), assetsFrom: templatesOnly ? null : (scratch ? 'gulp build --variables' + (container ? ' in ' + container : '') : builtAssets) }, null, 2) + '\n');
written.push('GENERATED.json');

if (scratch && !flag('keep-build')) fs.rmSync(scratch, { recursive: true, force: true });
log('Simplified theme written to ' + target + ':\n  ' + written.join('\n  '));
