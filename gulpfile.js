/**
 * Gulp Packages
 */

/*
 * Key Commands.
 *
 * Default build (source ./source, output ./asset, config ./_00_main_configuration.yml):
 *   gulp build
 *
 * Site build from an alternative config. A bare name is looked up as ./alt-config/<name>.yml and,
 * unless --dest is given, built to ./asset-<name>; a path (anything containing a slash) is used as is:
 *   gulp build --config my-site
 *   gulp build --config /var/www/html/files/theme-assets/<theme>/<site-slug>/config.yml --dest /var/www/html/files/theme-assets/<theme>/<site-slug>.building
 *
 * CSS variables (opt-in): after the build, rewrite the stylesheet so its palette and fonts read from CSS
 * variables (tools/css-variables.js; adds a minute or two). The Simplified theme is made this way; the
 * Advanced theme builds plain CSS unless asked.
 *   gulp build --variables
 *
 * Everything at once: the default build, then one build per ./alt-config/*.yml (each to its own
 * asset-<name>), each in its own process so one failure does not stop the rest; a summary and a
 * non-zero exit when any failed. --configs <dir> reads the configs from another directory.
 *   gulp build --all
 *   gulp build --all --configs ./my-configs
 *
 * Default configuration under another name (relative to the theme, or absolute):
 *   gulp build --mainconfig my-configuration.yml
 *
 * Alternative source folder / image folder (relative to the theme, or absolute):
 *   gulp build --source ./alt-source-folder --sourceimgs ./alt-img-folder
 *
 * The alternative config is layered over the main configuration. Both are converted to SASS in a
 * temporary directory that is put first on the SASS load path, so nothing is generated inside ./source.
 * Missing config or source directories are hard errors (non-zero exit), never silent fallbacks.
 */

// General
var {gulp, src, dest, watch, series, parallel, task} = require('gulp');
var del = require('del');
var flatmap = require('gulp-flatmap');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var header = require('gulp-header');
var package = require('./package.json');
var os = require('os');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv; // Must be version 16, as 17 is ES-only.

// Scripts
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-terser');
var modernizr = require('gulp-modernizr');

// Styles
var sass = require('gulp-dart-sass');
var sourcemaps = require("gulp-sourcemaps");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

// PNG

var imagemin = require('gulp-imagemin');
imagemin.optipng({optimizationLevel: 7});

// SVGs
var svgmin = require('gulp-svgmin');

// BrowserSync
var browserSync = require('browser-sync');

/**
 * Settings
 * Turn on/off build features
 */

var settings = {
  clean: true,
  coreScripts: true,
  scripts: true,
  modernizr: true,
  styles: true,
  img: false, // use if images are not separated into subdirectories by file type. otherwise use below.
  svgs: true,
  pngs: true,
  jpgs: true,
  fonts: true,
  copy: true,
  reload: false
};



/**
 * Paths to project folders
 */


var package_dir = "./node_modules/stop14-themesystem-legacy/source";
var asset_basename = 'asset';
var alt_config_dir = './alt-config';
// --mainconfig <path>: the theme's default configuration when it is not ./_00_main_configuration.yml
// (relative to the theme, or absolute). A theme that renames the file declares it in theme.ini (agile_build_config).
var main_config_file = (typeof argv.mainconfig === "string" && argv.mainconfig !== '')
  ? (path.isAbsolute(argv.mainconfig) ? argv.mainconfig : './' + argv.mainconfig.replace(/^\.\//, ''))
  : './_00_main_configuration.yml';
const ymlFilePattern = /([^.]*)\.ya?ml$/i;

// A relative --source/--sourceimgs is relative to the theme root; absolute paths are used as is.
function resolveDirArg(value) {
  if (typeof value === "undefined" || value === '' || value === true) return null;
  return path.isAbsolute(value) ? value : './' + value.replace(/^\.\//, '');
}

// --config <name|path>: a bare name means ./alt-config/<name>.yml; anything with a slash is a path.
function resolveConfigArg(value) {
  if (typeof value === "undefined" || value === '' || value === true) return null;
  const str = String(value);
  if (str.includes('/') || str.includes('\\')) {
    const file = path.resolve(str);
    return { name: path.basename(file).replace(ymlFilePattern, '$1'), path: file };
  }
  const name = str.replace(ymlFilePattern, '$1');
  return { name: name, path: path.resolve(alt_config_dir, name + '.yml') };
}

var alt_config = resolveConfigArg(argv.config);
var source_dir = resolveDirArg(argv.source) || './source';
var source_image_dir = resolveDirArg(argv.sourceimgs);
var build_dir = typeof argv.dest !== "undefined" && argv.dest !== true && argv.dest !== ''
  ? path.resolve(argv.dest)
  : './' + asset_basename + (alt_config ? '-' + alt_config.name : '');

// Generated SASS configuration lives here for the life of this process, never inside ./source.
// Removed on exit, including after a failed task.
var generated_config_dir = fs.mkdtempSync(path.join(os.tmpdir(), 's14-config-'));
process.on('exit', function() {
  try { fs.rmSync(generated_config_dir, {recursive: true, force: true}); } catch (e) { /* best effort */ }
});

var paths = getPaths(source_dir,build_dir);


function getPaths(source_dir,build_dir) {
  return {
     input: source_dir,
     output:  build_dir,
     scripts: {
       core: package_dir + '/js',
       input: source_dir + '/js',
       output: build_dir + '/js/',
       coreFilename: 'core',
       cfilename: 'default', // Output file name for concatenated scripts. Set to false to use output folder name
       vfilename: 'vendor' // Output file name for vendor scripts
     },
     styles: {
       generatedConfig: generated_config_dir, // Where the YAML configuration is converted to SASS
       input: source_dir + '/sass/**/*.{scss,sass}',
       output: build_dir + '/css',
       vfilename: 'vendor', // Output file name for vendor styles
       sassIncludePaths: [generated_config_dir, package_dir + '/sass/a_components',package_dir + '/sass/b_profiles',source_dir + '/sass',package_dir + '/sass/a_components/00_general',package_dir + '/sass/a_components/10_colours_and_patterns', package_dir + '/sass/a_components/20_layout',package_dir + '/sass/a_components/30_typography',package_dir + '/sass/a_components/40_ui',package_dir + '/sass/a_components/50_animation',package_dir + '/sass/a_components/60_site_elements','node_modules']
     },
     img: {
       input: source_image_dir ? source_image_dir + '/**/*' : source_dir + '/img/**/*',
       output: build_dir + '/img'
     },
     svgs: {
       input: source_image_dir ? source_image_dir + '/svg/**/*.svg' : source_dir + '/img/svg/**/*.svg',
       output: build_dir + '/img/svg/',
     },
     pngs: {
       input: source_image_dir ? source_image_dir + '/png/**/*.png' : source_dir + '/img/png/**/*.png',
       output: build_dir + '/img/png/',
     },
     jpgs: {
       input: source_image_dir ? source_image_dir + '/jpg/**/*.jpg' : source_dir + '/img/jpg/**/*.jpg',
       output: build_dir + '/img/jpg/',
     },
     fonts: {
       input: source_dir + '/fonts/**/*',
       output: build_dir + '/fonts',
     },
     copy: {
       input: source_dir + '/copy/**/*',
       output: build_dir
     },
     reload: './'
   };
}
/**
 * Copy third-party scripts and styles.
 */

var vendor_scripts = ['node_modules/superfish/dist/js/hoverIntent.js','node_modules/superfish/dist/js/superfish.js','node_modules/ev-emitter/ev-emitter.js','node_modules/imagesloaded/imagesloaded.js','node_modules/jquery-reflow-table/dist/js/reflow-table.js','node_modules/in-view/dist/in-view.min.js','node_modules/select2/dist/js/select2.min.js', 'node_modules/masonry-layout/dist/masonry.pkgd.js'];
var vendor_styles = ['node_modules/superfish/dist/css/superfish.css','node_modules/jquery-reflow-table/dist/css/reflow-table.css','node_modules/select2/dist/css/select2.min.css'];


/**
 * Template for banner to add to file headers
 */

if (typeof package === "undefined") {
  let package = {
    name: 'Stop14 Theme System Scaffolding',
    author: {
      name: 'See theme authoring information'
    },
    description: 'Automatically generated file',
    version: '1.x.x',
    license: "MIT",
    repository: {
      url: 'https://github.com/stop14/stop14-themesystem-legacy'
    }
  }
  var banner = {
    full:
      '/*!\n' +
      ' * <%= package.name %> v<%= package.version %>\n' +
      ' * <%= package.description %>\n' +
      ' * (c) ' + new Date().getFullYear() + ' Theme author' +
      ' * <%= package.license %> License\n' +
      ' * https://github.com/stop14/stop14-themesystem-legacy]' +
      ' */\n\n',
    min:
      '/*!' +
      ' <%= package.name %> v<%= package.version %>' +
      ' | (c) ' + new Date().getFullYear() + ' Theme author' +
      ' | <%= package.license %> License' +
      ' * https://github.com/stop14/stop14-themesystem-legacy]' +
      ' */\n'
  };
} else {
  var banner = {
    full:
      '/*!\n' +
      ' * <%= package.name %> v<%= package.version %>\n' +
      ' * <%= package.description %>\n' +
      ' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
      ' * <%= package.license %> License\n' +
      ' * <%= package.repository.url %>\n' +
      ' */\n\n',
    min:
      '/*!' +
      ' <%= package.name %> v<%= package.version %>' +
      ' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
      ' | <%= package.license %> License' +
      ' | <%= package.repository.url %>' +
      ' */\n'
  };
}

/**
 *  Define CSS Plugins
 */

var cssPlugins = [
  autoprefixer({cascade: true, remove: true}),
  cssnano({discardComments: { removeAll: true}})
];



/**
 * Gulp Tasks
 */

// Remove pre-existing content from output folders
var cleanDist = function (done) {

  // Make sure this feature is activated before running
  if (!settings.clean) return done();
  console.log("Cleaning: " + paths.output);

  // The destination may be outside the theme (Omeka's files/ directory), which del refuses without
  // force. Guard force against destinations that could take the theme or the system with them.
  const target = path.resolve(paths.output);
  const cwd = process.cwd();
  if (target === path.parse(target).root || target === cwd || cwd.startsWith(target + path.sep) || target.split(path.sep).filter(Boolean).length < 3) {
    throw new Error("Refusing to clean unsafe destination " + target);
  }
  del.sync([target], {force: true});

  // Signal completion
  return done();
};

// Repeated JavaScript tasks
var jsTasks = defineJsTasks();


function getOutputPath() {
  return paths.scripts.output;
}

function defineJsTasks() {
 return lazypipe()
  .pipe(header, banner.full, {package: package})
  .pipe(dest, paths.scripts.output)
  .pipe(rename, {suffix: '.min'})
  .pipe(uglify)
  .pipe(header, banner.min, {package: package})
  .pipe(dest, paths.scripts.output);
}

// Resolve when a stream has been fully consumed, or reject on its first error.
function streamDone(stream) {
  return new Promise((resolve, reject) => {
    stream.on('error', reject).on('end', resolve).resume();
  });
}

// Each directory under the input is concatenated into one script (named by filenameOption, or after the
// directory when false); loose files are processed individually. Every inner pipeline is awaited, so the
// task cannot finish before the scripts are written or hide an error raised while writing them.
function buildScriptSet(input, filenameOption) {
  jsTasks = defineJsTasks(); // The output directory may have changed since load.
  const pending = [];
  const outer = src(input)
    .pipe(flatmap(function(stream, file) {
      if (file.isDirectory()) {
        const filename = filenameOption === false ? file.relative : filenameOption;
        pending.push(streamDone(
          src(file.path + '/*.js')
            .pipe(sourcemaps.init())
            .pipe(concat(filename + '.js'))
            .pipe(jsTasks())
            .pipe(sourcemaps.write('./'))
            .pipe(dest(paths.scripts.output))
        ));
        return stream;
      }
      return stream.pipe(jsTasks());
    }));
  return streamDone(outer).then(() => Promise.all(pending));
}

// Theme system core scripts (from the stop14 package)
var buildCoreScripts = function (done) {
  if (!settings.coreScripts) return done();
  return buildScriptSet(paths.scripts.core, paths.scripts.coreFilename);
};

// Theme scripts
var buildScripts = function (done) {
  if (!settings.scripts) return done();
  return buildScriptSet(paths.scripts.input, paths.scripts.cfilename);
};

var buildVendorScripts = function(done) {
  if (!settings.scripts) return done();

  return src(vendor_scripts)
        .pipe(concat(paths.scripts.vfilename + '.js'))
        .pipe(header(banner.full, {package: package}))
        .pipe(dest(paths.scripts.output))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(dest(paths.scripts.output));
}

// Lint scripts
var lintScripts = function (done) {

  // Make sure this feature is activated before running
  if (!settings.scripts) return done();

  // Lint scripts
  return src(paths.scripts.input)
    .pipe(eslint({
      "configFile": './.eslintrc',
      "env": {
        "node": false,
        "es6": true,
        "browser": true
      }
    }))
    .pipe(eslint.format());
};

var buildModernizr = function(done) {

  if (!settings.modernizr) return done();

  return src(paths.scripts.input + '/*.js')
    .pipe(modernizr(require('./modernizr-config.json')))
    .pipe(dest(paths.scripts.output))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(dest(paths.scripts.output));
}

// Last-resort reader for configuration files that are not valid YAML, e.g. old generated files with
// doubled quotes (basefont: ""Open Sans", sans-serif"). Mirrors the theme system's original sed/awk
// parser: one `key: value` per line, one layer of matching outer quotes stripped, no nesting.
function lenientConfigLoad(text) {
  const result = {};
  text.split(/\r?\n/).forEach(function(line) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*?)\s*$/);
    if (!m || m[1] === '') return;
    let value = m[2];
    if (value.length >= 2 && ((value[0] === '"' && value[value.length - 1] === '"') || (value[0] === "'" && value[value.length - 1] === "'"))) {
      value = value.slice(1, -1);
    }
    result[m[1]] = value === 'null' ? null : value;
  });
  return result;
}

// Convert a YAML configuration file to SASS variable declarations. Values are emitted as written (a YAML
// string "'../img'" becomes $dir_image: '../img'; "$white" stays a SASS reference). YAML null becomes
// SASS null, which the theme system uses to mean "off" (callout_inset, base_delay); an empty string
// means "unset" and is skipped so the library default applies. Nested maps are flattened by
// concatenating their keys and a repeated key overrides the earlier one, as the original parser did.
function yamlToSass(ymlPath, sassPath) {
  const header = fs.readFileSync('./node_modules/stop14-themesystem-legacy/boilerplate/sass_config_header.txt', 'utf8');
  const lines = [];
  const emit = function(prefix, value) {
    Object.keys(value || {}).forEach(function(key) {
      const item = value[key];
      if (typeof item === "undefined") return;
      if (item === null) {
        lines.push('$' + prefix + key + ': null');
      } else if (typeof item === "object" && !Array.isArray(item)) {
        emit(prefix + key, item);
      } else if (String(item).trim() !== '') {
        lines.push('$' + prefix + key + ': ' + String(item));
      }
    });
  };
  if (ymlPath) {
    const text = fs.readFileSync(ymlPath, 'utf8');
    let parsed;
    try {
      parsed = yaml.safeLoad(text, {json: true});
    } catch (e) {
      console.warn("WARNING: " + ymlPath + " is not valid YAML (" + e.reason + (e.mark ? ", line " + (e.mark.line + 1) : '') + "). " +
        "Read leniently, line by line; fix the file or regenerate it from the site's theme settings.");
      parsed = lenientConfigLoad(text);
    }
    if (parsed !== null && typeof parsed !== "object") {
      throw new Error("Configuration file " + ymlPath + " must contain a YAML mapping.");
    }
    emit('', parsed);
  }
  fs.mkdirSync(path.dirname(sassPath), {recursive: true});
  fs.writeFileSync(sassPath, header + lines.join('\n') + '\n');
  console.log("Configuration " + (ymlPath || '(none)') + " -> " + sassPath + " (" + lines.length + " variables)");
}

// Generate the SASS configuration from the main YAML file and, when given, the alternative config.
// Stale generated files inside ./source would shadow the fresh ones (relative imports win), so they
// are removed.
var buildSassConfig = function (done) {
  ['_00_main_configuration.sass', '_00_temp_configuration.sass'].forEach(function(name) {
    const stale = path.join(source_dir, 'sass', '00_configuration', name);
    if (fs.existsSync(stale)) {
      console.warn("Removing stale generated file " + stale + " (configuration is now generated outside ./source)");
      fs.unlinkSync(stale);
    }
  });
  if (!fs.existsSync(main_config_file)) {
    throw new Error("Main configuration file " + main_config_file + " does not exist.");
  }
  yamlToSass(main_config_file, path.join(paths.styles.generatedConfig, '_00_main_configuration.sass'));
  yamlToSass(alt_config ? alt_config.path : null, path.join(paths.styles.generatedConfig, '_00_temp_configuration.sass'));
  done();
}

// Process, lint, and cssnano Sass files
var buildStyles = function (done) {

  // Make sure this feature is activated before running
  if (!settings.styles) return done();

  // Run tasks on all Sass filesbuild

  return src(paths.styles.input)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: paths.styles.sassIncludePaths, // Allows @import declarations deeper in the tree to target top-level directories. Useful for loading in components and profiles.
      srcComments: false,
      silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin','mixed-decls'], // The IDs of deprecations you want to silence
    }))
    .pipe(header(banner.full, { package : package }))
    .pipe(dest(paths.styles.output))
    .pipe(rename({suffix: '.min'}))
    .pipe(postcss(cssPlugins))
    .pipe(header(banner.min, { package : package }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.styles.output));
};


var buildVendorStyles = function(done) {

  if (!settings.scripts) return done();

  return src(vendor_styles)
    .pipe(concat(paths.styles.vfilename + '.css'))
    .pipe(sourcemaps.init())
    .pipe(header(banner.full, { package : package }))
    .pipe(dest(paths.styles.output))
    .pipe(rename({basename: paths.styles.vfilename, suffix: '.min'}))
    .pipe(postcss(cssPlugins))
    .pipe(header(banner.min, { package : package }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.styles.output));

}




// Copy Image files
var buildImages = function (done) {

  // Make sure this feature is activated before running
  if (!settings.img) return done();

  console.log("images");
  console.log(paths.img.output);
  // Optimize SVG files
  return src(paths.img.input)
    .pipe(dest(paths.img.output));
};


// Optimize SVG files
var buildSVGs = function (done) {

  // Make sure this feature is activated before running
  if (!settings.svgs) return done();

  // Optimize SVG files
  return src(paths.svgs.input)
    .pipe(svgmin())
    .pipe(dest(paths.svgs.output));

};

// Copy PNG files
var buildPNGs = function (done) {

  // Make sure this feature is activated before running
  if (!settings.pngs) return done();

  // Optimize PNG files
  return src(paths.pngs.input)
    .pipe(imagemin())
    .pipe(dest(paths.pngs.output));
};

// Copy JPG files
var buildJPGs = function (done) {

  // Make sure this feature is activated before running
  if (!settings.jpgs) return done();

  // Optimize SVG files
  return src(paths.jpgs.input)
    .pipe(dest(paths.jpgs.output));
};


// Copy Font Files
var buildFonts = function (done) {

  // Make sure this feature is activated before running
  if (!settings.fonts) return done();

  // Optimize SVG files
  return src(paths.fonts.input)
    .pipe(dest(paths.fonts.output));
};



// Copy theme-specific static files into output folder
var copyFiles = function (done) {

  // Make sure this feature is activated before running
  if (!settings.copy) return done();

  // Copy static files
  return src(paths.copy.input)
    .pipe(dest(paths.copy.output));

};

// Watch for changes to the source directory
var startServer = function (done) {

  // Make sure this feature is activated before running
  if (!settings.reload) return done();

  // Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: paths.reload
    }
  });

  // Signal completion
  done();

};

// Reload the browser when files change
var reloadBrowser = function (done) {
  if (!settings.reload) return done();
  browserSync.reload();
  done();
};


// @todo: watch functions not working, building the config file initiates an infinite loop.
// watch function should take an ignored parameter, but it’s not working as expected.

// Watch for changes
var watchSrc = function (done) {
  watch(paths.input, {ignored : '_00_main_configuration.sass'}, series(exports.default, reloadBrowser));
  done();
};

// Watch for changes
var watchJs = function (done) {
  watch(paths.input, {ignored : '_00_main_configuration.sass'}, series(exports.js, reloadBrowser));
  done();
};

// Watch for changes
var watchSass = function (done) {
  watch(paths.input, {ignored : '_00_main_configuration.sass'}, series(exports.sass, reloadBrowser));
  done();
};


// Watch for changes
var watchMin = function (done) {
  watch(paths.input,{ignored : '_00_main_configuration.sass'}, series(exports.sassmin, exports.js, reloadBrowser));
  done();
};

/*
function getAlternativeConfigFiles() {
  if (fs.existsSync(alt_config_dir)) {
    const files = fs.readdirSync(alt_config_dir);

    // Ensure that config files have yml extension.
    // This prevents processing of stray files, like the Mac file system’s hidden .DS_Store files
    return filteredFiles = files.filter(filename => {
      return ymlFilePattern.test(filename)
    });
    } else {
    return [];
    }
}*/

var testSourceDirectory = function(done) {
  if (!fs.existsSync(paths.input)) {
    throw new Error("Source directory " + paths.input + " does not exist.");
  }
  done();
}

// Remove the generated SASS configuration directory.
var cleanupGeneratedConfig = function(done) {
  del.sync([paths.styles.generatedConfig], {force: true});
  done();
}

// Validate the alternative configuration (--config). A missing file is an error: building with the
// default configuration instead would silently overwrite the wrong asset folder.
var configAltAssets = function(done) {
  if (alt_config === null) {
    done();
    return;
  }
  if (!fs.existsSync(alt_config.path)) {
    throw new Error("Configuration file " + alt_config.path + " does not exist.");
  }
  console.log("Building with configuration " + alt_config.path + " into " + path.resolve(paths.output));
  done();
}

// Report where the build landed.
var reportBuild = function(done) {
  console.log("Build complete: " + path.resolve(paths.output));
  done();
}

// --variables: run tools/css-variables.js on what was just built (see the notes at the top).
function applyCssVariables(done) {
  if (!argv.variables) return done();
  const { spawnSync } = require('child_process');
  const toolArgs = [path.join(__dirname, 'tools', 'css-variables.js'), '--write', '--css-dir', path.join(paths.output, 'css')];
  if (alt_config) toolArgs.push('--config', alt_config.path);
  if (typeof argv.mainconfig === 'string' && argv.mainconfig !== '') toolArgs.push('--mainconfig', argv.mainconfig);
  console.log('Rewriting the stylesheet to read its palette and fonts from CSS variables…');
  const result = spawnSync(process.execPath, toolArgs, { cwd: __dirname, stdio: 'inherit' });
  if (result.status !== 0) return done(new Error('css-variables.js failed' + (result.error ? ': ' + result.error.message : ' (exit ' + result.status + ')')));
  done();
}

function buildAll(done) {
  series(
    testSourceDirectory,
    configAltAssets,
    cleanDist,
    buildSassConfig,
    buildStyles,
    lintScripts,
    buildCoreScripts,
    buildScripts,
    buildVendorScripts,
    buildVendorStyles,
    buildImages,
    buildSVGs,
    buildPNGs,
    buildJPGs,
    buildFonts,
    copyFiles,
    buildModernizr,
    applyCssVariables,
    reportBuild,
    cleanupGeneratedConfig)(done);
}

/**
 * --all: every configuration, one build per process (see the notes at the top).
 */
function buildEveryConfig(done) {
  const { spawnSync } = require('child_process');
  const configDir = resolveDirArg(argv.configs) || alt_config_dir;
  const configs = fs.existsSync(configDir)
    ? fs.readdirSync(configDir).filter((f) => ymlFilePattern.test(f)).sort()
    : [];
  if (argv.configs && !fs.existsSync(configDir)) {
    return done(new Error("Config directory " + configDir + " does not exist."));
  }

  // Options that apply to every build are passed on; --config/--dest are per build.
  const shared = [];
  ['mainconfig', 'source', 'sourceimgs'].forEach((name) => {
    if (typeof argv[name] === 'string' && argv[name] !== '') shared.push('--' + name, argv[name]);
  });
  if (argv.variables) shared.push('--variables');
  const gulpBin = path.join(__dirname, 'node_modules', 'gulp', 'bin', 'gulp.js');
  const runs = [{ label: 'default (' + asset_basename + ')', args: [] }].concat(configs.map((file) => ({
    label: file.replace(ymlFilePattern, '$1') + ' (' + asset_basename + '-' + file.replace(ymlFilePattern, '$1') + ')',
    args: ['--config', path.join(configDir, file)],
  })));

  console.log("Building " + runs.length + " configuration(s): " + runs.map((r) => r.label.split(' ')[0]).join(', '));
  const results = runs.map((run) => {
    console.log("\n==== " + run.label + " ====");
    const started = Date.now();
    const result = spawnSync(process.execPath, [gulpBin, 'build'].concat(run.args, shared), { cwd: __dirname, stdio: 'inherit' });
    return { label: run.label, ok: result.status === 0, seconds: Math.round((Date.now() - started) / 1000), status: result.status, error: result.error };
  });

  console.log("\n==== Summary ====");
  results.forEach((r) => console.log((r.ok ? "  ok    " : "  FAIL  ") + r.label + "  (" + r.seconds + "s" + (r.ok ? "" : ", exit " + (r.error ? r.error.message : r.status)) + ")"));
  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    return done(new Error(failed.length + " of " + results.length + " build(s) failed: " + failed.map((r) => r.label.split(' ')[0]).join(', ')));
  }
  done();
}

/**
 * Export Tasks
 */

// Default task
// gulp
exports.default = series(
  buildAll
);

exports.build = argv.all ? series(buildEveryConfig) : series(
  buildAll
);

exports.sass = series(
  configAltAssets,
  buildSassConfig,
  buildStyles,
  reportBuild
);

// No config
exports.sassmin = series(
  buildStyles
);

exports.buildConfig = series(
  buildSassConfig
);

exports.js = series(
  lintScripts,
  buildCoreScripts,
  buildScripts,
  buildVendorScripts,
  buildModernizr
);

exports.vendor = series(
  buildVendorScripts,
  buildVendorStyles
);

exports.images = series(
  buildImages,
  buildSVGs,
  buildPNGs,
  buildJPGs
);

exports.fonts = series(
  buildFonts
);

// Watch and reload
// gulp watch
exports.watch = series(
  exports.default,
  startServer,
  watchSrc
);

// Build styles and scripts without time consuming image processing
// gulp watchmin
// Does not build SASS config

exports.watchmin = series(
  exports.sassmin,
  exports.js,
  startServer,
  watchMin
);

// Watch and reload scripts only
// gulp jswatch
exports.jswatch = series(
  exports.js,
  startServer,
  watchJs
);

// Watch and reload styles only
// gulp sasswatch
exports.sasswatch = series(
  exports.sass,
  startServer,
  watchSass
);

exports.clean = series(
  cleanDist
);
