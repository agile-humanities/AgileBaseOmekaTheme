/*jslint browser: true, esversion: 6 */
/*global Mirador, Drupal, once*/
/**
 * @file
 * Displays Mirador viewer.
 *
 */

(function($) {
  $(document).ready(async function() {
    let plugins = [];
    if (window.miradorPlugins && window.miradorPlugins.length) {
      for (let {plugin, name} of window.miradorPlugins) {
        if (window.globalMiradorPlugins.includes(name)) {
          plugins = [...plugins, ...plugin];
        }
      }
    }
    await Object.keys(miradors).forEach(viewerId => {
      let values = {
        window: {}
      };
      values.selectedTheme = 'dark';
      values.themes = {
        dark: {
          palette: {
            type: 'dark',
            primary: {
              main: '#212121',
            },
            secondary: {
              main: '#4db6ac',
            },
            shades: {
              dark: '#111111',
              main: '#212121',
              light: '#434240',
            }
          }
        },
        light: {
          palette: {
            type: 'light',
          }
        }
      };

      values.window.allowMaximize = false;
      values.workspace = {};
      values.workspace.showZoomControls = true;

      miradors[viewerId].values = values;
      miradors[viewerId] = Mirador.viewer(miradors[viewerId], plugins);
      console.log(miradors);
    });
  });

})(jQuery);
