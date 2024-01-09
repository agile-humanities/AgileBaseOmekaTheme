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
var source_dir = './source';
var build_dir = './asset';

var paths = {
  input: source_dir,
  output: build_dir,
  scripts: {
    core: package_dir + '/js',
    input: source_dir + '/js',
    output: build_dir + '/js/',
    coreFilename: 'core',
    cfilename: 'default', // Output file name for concatenated scripts. Set to false to use output folder name
    vfilename: 'vendor' // Output file name for vendor scripts
  },
  styles: {
    input: source_dir + '/sass/**/*.{scss,sass}',
    output: build_dir + '/css',
    vfilename: 'vendor', // Output file name for vendor styles
    sassIncludePaths: [package_dir + '/sass/a_components',package_dir + '/sass/b_profiles',source_dir + '/sass',package_dir + '/sass/a_components/00_general',package_dir + '/sass/a_components/10_colours_and_patterns', package_dir + '/sass/a_components/20_layout',package_dir + '/sass/a_components/30_typography',package_dir + '/sass/a_components/40_ui',package_dir + '/sass/a_components/50_animation',package_dir + '/sass/a_components/60_site_elements','node_modules']
  },
  img: {
    input: source_dir + '/img/**/*',
    output: build_dir + '/img'
  },
  svgs: {
    input: source_dir + '/img/svg/**/*.svg',
    output: build_dir + '/img/svg/',
  },
  pngs: {
    input: source_dir + '/img/png/**/*.png',
    output: build_dir + '/img/png/',
  },
  jpgs: {
    input: source_dir + '/img/jpg/**/*.jpg',
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
 * Gulp Packages
 */

// General
var {gulp, src, dest, watch, series, parallel} = require('gulp');
var del = require('del');
var flatmap = require('gulp-flatmap');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var header = require('gulp-header');
var package = require('./package.json');
var exec = require('gulp-exec');

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

  // Clean the build folder
  del.sync([
    paths.output
  ]);

  // Signal completion
  return done();
};

// Repeated JavaScript tasks
var jsTasks = lazypipe()
  .pipe(header, banner.full, {package: package})
  .pipe(dest, paths.scripts.output)
  .pipe(rename, {suffix: '.min'})
  .pipe(uglify)
  .pipe(header, banner.min, {package: package})
  .pipe(dest, paths.scripts.output);

// Lint, cssnano, and concatenate scripts
var buildCoreScripts = function (done) {

  // Make sure this feature is activated before running
  if (!settings.coreScripts) return done();

  // Run tasks on script files
  return src(paths.scripts.core)
    .pipe(flatmap(function(stream, file) {

      // If the file is a directory
      if (file.isDirectory()) {

        // Setup a suffix variable
        var suffix = '';

        // Setup a filename.

        var filename = paths.scripts.coreFilename === false ? file.relative : paths.scripts.coreFilename;


        // Grab all files and concatenate them

        src(file.path + '/*.js')
          .pipe(sourcemaps.init()) // TO DO: Sourcemaps not working as expected.
          .pipe(concat(filename + suffix + '.js'))
          .pipe(jsTasks())
          .pipe(sourcemaps.write('./'));

        return stream;

      }

      // Otherwise, process the file
      return stream.pipe(jsTasks());

    }));

};

// Lint, cssnano, and concatenate scripts
var buildScripts = function (done) {

  // Make sure this feature is activated before running
  if (!settings.scripts) return done();

  // Run tasks on script files
  return src(paths.scripts.input)
    .pipe(flatmap(function(stream, file) {

      // If the file is a directory
      if (file.isDirectory()) {

        // Setup a suffix variable
        var suffix = '';

        // Setup a filename.

        var filename = paths.scripts.cfilename === false ? file.relative : paths.scripts.cfilename;


        // Grab all files and concatenate them

        src(file.path + '/*.js')
          .pipe(sourcemaps.init()) // TO DO: Sourcemaps not working as expected.
          .pipe(concat(filename + suffix + '.js'))
          .pipe(jsTasks())
          .pipe(sourcemaps.write('./'));

        return stream;

      }

      // Otherwise, process the file
      return stream.pipe(jsTasks());

    }));

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

var buildSassConfig = function(done) {
  const options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: true, // default = false, true means stdout is written to file.contents
  };

  const reportOptions = {
    err: false, // default = true, false means don't write err
    stderr: false, // default = true, false means don't write stderr
    stdout: false // default = true, false means don't write stdout
  };

  return src(paths.styles.input)
    .pipe(exec(file => `parse-yaml _00_main_configuration.yml`),options)
    .pipe(exec.reporter(reportOptions));
}

// Process, lint, and cssnano Sass files
var buildStyles = function (done) {

  // Make sure this feature is activated before running
  if (!settings.styles) return done();

  // Run tasks on all Sass files

  return src(paths.styles.input)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: paths.styles.sassIncludePaths, // Allows @import declarations deeper in the tree to target top-level directories. Useful for loading in components and profiles.
      srcComments: false
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

  // Optimize SVG files
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





/**
 * Export Tasks
 */

// Default task
// gulp
exports.default = series(
  cleanDist,
  buildSassConfig,
  parallel(
    lintScripts,
    buildCoreScripts,
    buildScripts,
    buildVendorScripts,
    buildStyles,
    buildVendorStyles,
    buildImages,
    buildSVGs,
    buildPNGs,
    buildJPGs,
    buildFonts,
    copyFiles
  ),
  buildModernizr
);

exports.build = exports.default;

exports.sass = series(
  buildSassConfig,
  buildStyles
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
