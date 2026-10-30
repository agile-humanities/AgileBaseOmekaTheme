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
 *      Then copy, verbatim, the templates the Advanced theme provides for Agile Theme Tools' own pages, blocks and
 *      partials (MODULE_TEMPLATES). Omeka only resolves those when the module is active (its item controller, its
 *      block layouts, its view helpers), so a stock install never reads them, and a site that has the module gets
 *      the markup this theme's stylesheet was compiled for instead of the module's plainer default templates.
 *      Advanced Search's templates are forwarded to the module's Agile search page when the module is active and
 *      fall back to Advanced Search's own templates when it is not.
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
  'common/header-search-link.phtml',
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
  'omeka/site/page/show.phtml',
  // Published under another path: the item browse and search pages, which Agile Theme Tools routes to
  // agile-theme-tools/agile-item/* in the Advanced theme and core resolves as omeka/site/item/* without the module.
  // (Omeka renders an item set's page with the item browse template too.) The Advanced theme's own
  // omeka/site/item/browse.phtml is an older template that nothing renders any more; it is not carried over.
  { from: 'agile-theme-tools/agile-item/browse.phtml', to: 'omeka/site/item/browse.phtml' },
  { from: 'agile-theme-tools/agile-item/search.phtml', to: 'omeka/site/item/search.phtml' },
  // Advanced Search's templates: the Advanced theme forwards each to the module's Agile search page (search/agile/*).
  // Here each forwarder is guarded (see REWRITES): the Agile page with the module, Advanced Search's own template
  // without it.
  'search/facet-actives.phtml',
  'search/facet-checkboxes.phtml',
  'search/facet-links.phtml',
  'search/facets-list.phtml',
  'search/results-header-footer.phtml',
  'search/results.phtml',
  'search/search-form-main-headers.phtml',
  'search/search-form-main.phtml',
  'search/search.phtml',
];

// Templates for Agile Theme Tools' own pages, blocks and partials, copied verbatim: Omeka resolves them only when the
// module is active, and they may use the module's helpers freely. Every block-layout template except the core blocks
// listed above, the module's resource-page blocks, its card display mode, the slide partials, and the item pages
// under the module's controller. A new block template in the Advanced theme is picked up at the next run.
const CORE_BLOCKS = ['asset.phtml', 'browse-preview.phtml', 'item-with-metadata.phtml', 'line-break.phtml', 'page-date-time.phtml'];
const listDir = (rel, keep) => fs.readdirSync(path.join(theme, 'view', rel)).filter((n) => /\.phtml$/.test(n) && (!keep || keep(n))).sort().map((n) => rel + '/' + n);
const MODULE_TEMPLATES = [
  ...listDir('common/block-layout', (n) => !CORE_BLOCKS.includes(n)),
  ...listDir('common/resource-page-block-layout'),
  ...listDir('common/display-mode'),
  'agile-item/slide-item.phtml',
  'agile-item/slide-item-attachments-home.phtml',
  'agile-item/download-item-block.phtml',
  'agile-theme-tools/agile-item/browse.phtml',
  'agile-theme-tools/agile-item/search.phtml',
  'agile-theme-tools/agile-item/show.phtml',
];

// Exact replacements. `files` limits a rule to those templates; a rule listed for a file MUST match there, so a
// change in the Advanced template that breaks the rewrite is caught instead of silently shipping module code.
// The colour part of the theme's configuration, baked into the palette shim so the Simplified theme can recompute its
// derived colour roles (agile-colour.php) from a changed palette without the module or a build.
const yaml = require('js-yaml');
function colourConfigLiteral() {
  const config = yaml.load(fs.readFileSync(path.join(theme, '_00_main_configuration.yml'), 'utf8')) || {};
  const NAMED = /^(white|black|transparent|red|blue|green|yellow|orange|purple|gray|grey|silver|navy|teal|maroon|olive|aqua|cyan|fuchsia|magenta|lime)$/i;
  const isColourish = (v) => NAMED.test(v) || /^(#[0-9a-f]{3,8}|\$[\w-]+|rgba?\(.*\)|mix\(.*\)|neutral\(.*\)|ensure-contrast\(.*\)|on-colou?r\(.*\)|set-colou?r\(.*\))$/i.test(v) && !/font|size|width|height|rem|px|em$/.test(v);
  const skipKey = /font|size|width|height|spacing|padding|margin|radius|scale|factor|breakpoint|delay|speed|path|dir|template|transform|display|position|direction|wrap|justify|align|fit|top|bottom|left|right|threshold|offset|stack|count|rows|properties|heartbeat|remove/;
  const entries = Object.keys(config).filter((k) => !skipKey.test(k) && typeof config[k] !== 'object' && config[k] !== null && isColourish(String(config[k]).trim())).map((k) => `    '${k}' => '${String(config[k]).trim().replace(/'/g, "\\'")}'`);
  return '[\n' + entries.join(',\n') + ',\n]';
}
const shim = (name) => fs.readFileSync(path.join(simplifiedSrc, 'shims', name + '.php'), 'utf8').trim().replace('__AGILE_COLOUR_CONFIG__', colourConfigLiteral());
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
  { from: "$searchConfig = $configId ? $this->api()->searchOne('search_configs', ['id' => $configId])->getContent() : null;", to: "$searchConfig = null; // Simplified theme: no Advanced Search", files: ['common/header-search-link.phtml'] },
  { from: "$searchConfig = $this->api()->searchOne('search_configs', ['id' => $searchMainPage])->getContent();", to: "$searchConfig = null; // Simplified theme: no Advanced Search", files: ['common/search-form.phtml'] },
  { from: "$searchAction = isset($searchAction) ? $searchAction : ($searchConfig ? $searchConfig->siteUrl() : '#');", to: "$searchAction = isset($searchAction) ? $searchAction : $this->url('site/resource', ['controller' => 'item', 'action' => 'browse'], [], true);", files: ['common/search-form.phtml'] },
  { from: "$searchValue = $this->escapeHtml($this->params()->fromQuery('q', ''));\n        $name='q';", to: "$searchValue = $this->escapeHtml($this->params()->fromQuery('fulltext_search', ''));\n        $name = 'fulltext_search';", files: ['common/search-form.phtml'] },
  // The item browse page without the module: no Solr redirect for item sets, the item set's items on the core browse
  // page, and no mobile browse controls (the module's template).
  { from: "$searchHelper = $this->plugin('agileSearchHelper');", to: "$searchHelper = null; // Simplified theme without the module: core item browse", files: ['omeka/site/item/browse.phtml'] },
  { from: " <?php if ($itemSetShow): ?>data-redirect=\"<?= $searchHelper->getSolrItemSetUrl($itemSet->id()) ?>\" <?php endif; ?>", to: "", files: ['omeka/site/item/browse.phtml'] },
  { from: "$url = $searchHelper->getSolrItemSetUrl($itemSet->id())\n                                ?: $searchHelper->getAdvancedSearchUrl() . '?' . http_build_query(['item_set_id' => [$itemSet->id()]]);", to: "$url = $this->url('site/resource', ['controller' => 'item', 'action' => 'browse'], ['query' => ['item_set_id' => [$itemSet->id()]]], true);", files: ['omeka/site/item/browse.phtml'] },
  { from: "<?= $partial('search/agile/mobile-browse-controls'); ?>", to: "<?php /* The mobile browse controls are the module's; none without it. */ ?>", files: ['omeka/site/item/browse.phtml'] },
  // Advanced Search's templates: the Agile search page with the module, Advanced Search's own template without it.
  // The include runs in the template's scope, so the variables Advanced Search passed are there as they would be.
  { regex: /^echo \$this->partial\('search\/agile\/([a-z-]+)', \$this->vars\(\)->getArrayCopy\(\)\);$/m, to: (m, name) => [
      "// Simplified theme: the Agile search page when Agile Theme Tools is active, otherwise Advanced Search's own template.",
      "if ($this->getHelperPluginManager()->has('agileSearchHelper')) {",
      "    echo $this->partial('search/agile/" + name + "', $this->vars()->getArrayCopy());",
      "} else {",
      "    $advancedSearchTemplate = OMEKA_PATH . '/modules/AdvancedSearch/view/' . __TEMPLATE__;",
      "    if (is_file($advancedSearchTemplate)) { include $advancedSearchTemplate; }",
      "}",
    ].join('\n'), files: ['search/facet-actives.phtml', 'search/facet-checkboxes.phtml', 'search/facet-links.phtml', 'search/facets-list.phtml', 'search/results-header-footer.phtml', 'search/results.phtml', 'search/search-form-main-headers.phtml', 'search/search-form-main.phtml', 'search/search.phtml'] },
  // The module's card display mode → the theme's standalone card partial (same option names), which the Simplified
  // theme carries as agile-item/card.phtml with the module helpers shimmed out.
  { regex: /\$this->card\(([^,()]+?)(?:,\s*(\[[^\]]*\]))?\)/g, to: (m, thing, opts) => "$this->partial('agile-item/card', ['item' => " + thing.trim() + "] + " + (opts || '[]') + ")" },
];

// Anything still naming a module after the rewrites stops the generation.
const helperCall = (name) => new RegExp("(plugin|get)\\('" + name + "'\\)|->" + name + "\\(");
const FORBIDDEN = [
  helperCall('siteAssetUrl'), helperCall('sitePartial'), helperCall('themeFonts'), helperCall('valueDisplay'), helperCall('propertyTerms'),
  helperCall('textSummary'), helperCall('agileSearchHelper'), helperCall('itemSetFacetHandler'), helperCall('dateHandler'), helperCall('pageSlug'),
  helperCall('siteHelper'), helperCall('universalViewer'), helperCall('searchQuickReplacement'), helperCall('mirador'), helperCall('iiifServer'),
  /'search_configs'/, /advancedsearch_main_config_replace/, /->card\(/, /->displayMode\(/,
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
for (const entry of TEMPLATES) {
  const from = typeof entry === 'string' ? entry : entry.from;
  const rel = typeof entry === 'string' ? entry : entry.to;
  const src = path.join(theme, 'view', from);
  if (!fs.existsSync(src)) { problems.push(from + ': missing in the Advanced theme'); continue; }
  let text = fs.readFileSync(src, 'utf8');
  for (const rule of REWRITES) {
    const applies = !rule.files || rule.files.includes(rel);
    if (!applies) continue;
    if (rule.regex) {
      if (rule.files && !rule.regex.test(text)) { problems.push(rel + ': expected pattern not found, the Advanced template changed:\n      ' + rule.regex.source.slice(0, 80)); continue; }
      text = text.replace(rule.regex, rule.to).split('__TEMPLATE__').join("'" + rel + "'");
      continue;
    }
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
for (const rel of MODULE_TEMPLATES) {
  const src = path.join(theme, 'view', rel);
  if (!fs.existsSync(src)) { problems.push(rel + ': missing in the Advanced theme'); continue; }
  if (out[rel]) { problems.push(rel + ': listed as both a core and a module template'); continue; }
  out[rel] = '<?php /* Copied from the Advanced Agile Base Theme by tools/build-simplified.js — edit the source there, not this file. Rendered only when the Agile Theme Tools module is active. */ ?>\n' + fs.readFileSync(src, 'utf8');
}
if (problems.length) fail('Templates not generated:\n  ' + problems.join('\n  '));

fs.rmSync(path.join(target, 'view'), { recursive: true, force: true });
for (const [rel, text] of Object.entries(out)) {
  const dst = path.join(target, 'view', rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, text);
  written.push('view/' + rel);
}
log((Object.keys(out).length - MODULE_TEMPLATES.length) + ' templates generated, ' + MODULE_TEMPLATES.length + ' module templates copied.');

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
fs.copyFileSync(path.join(simplifiedSrc, 'agile-colour.php'), path.join(target, 'agile-colour.php'));
written.push('agile-colour.php');
// The theme's configuration, so Agile Theme Tools (when present) can read the palette defaults and the colour roles
// for its Colours and fonts page. The Simplified theme has no build; the file is reference data only.
fs.writeFileSync(path.join(target, '_00_main_configuration.yml'), '# Reference copy of the Advanced theme\'s configuration at generation (tools/build-simplified.js). This theme has no\n# build: Agile Theme Tools reads the palette defaults and colour roles from it; nothing else uses it.\n' + fs.readFileSync(path.join(theme, '_00_main_configuration.yml'), 'utf8'));
written.push('_00_main_configuration.yml');
if (!fs.existsSync(path.join(target, 'LICENSE.txt')) && fs.existsSync(path.join(theme, 'LICENSE.txt'))) { fs.copyFileSync(path.join(theme, 'LICENSE.txt'), path.join(target, 'LICENSE.txt')); written.push('LICENSE.txt'); }
if (!fs.existsSync(path.join(target, 'custom.css'))) {
  fs.writeFileSync(path.join(target, 'custom.css'), fs.readFileSync(path.join(simplifiedSrc, 'custom.css'), 'utf8'));
  written.push('custom.css (new; never overwritten)');
}
if (!fs.existsSync(path.join(target, 'custom.js'))) fs.writeFileSync(path.join(target, 'custom.js'), '// Your own scripts for this theme. Loaded after the theme\'s scripts.\n');

let commit = null;
try { commit = String(spawnSync('git', ['rev-parse', 'HEAD'], { cwd: theme }).stdout).trim() || null; } catch (e) { /* no git */ }
fs.writeFileSync(path.join(target, 'GENERATED.json'), JSON.stringify({ generatedAt: new Date().toISOString(), source: 'AgileBaseOmekaTheme', sourceVersion: version, sourceCommit: commit, generator: 'tools/build-simplified.js', templates: Object.keys(out).filter((t) => !MODULE_TEMPLATES.includes(t)), moduleTemplates: MODULE_TEMPLATES, assetsFrom: templatesOnly ? null : (scratch ? 'gulp build --variables' + (container ? ' in ' + container : '') : builtAssets) }, null, 2) + '\n');
written.push('GENERATED.json');

if (scratch && !flag('keep-build')) fs.rmSync(scratch, { recursive: true, force: true });
log('Simplified theme written to ' + target + ':\n  ' + written.join('\n  '));
