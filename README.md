# 42 Bootstrap

This repo is a starter kit you can use to create your own project.

## Included

* Gulp
* BrowserSync
* Sass lint
* Sass compiling with:
  * UglifyCSS
  * PostCSS with:
    * Autoprefixer with ruleset: `'> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'`
    * CSS mq-packer which will place all the mediaqueries in the bottom of the css file
* JSCS
* Uglifying and combining of javascript files (from js-src folder to js folder)

## How to

You can just copy the files and run `npm install`. Then run `gulp` to start watching.

Other commands you can use are:
* `gulp sass-lint` to just check the sass coding standards
* `gulp js` to code standard check and combine the javascript files
* `gulp js-lib` to combine the javascript library files
* `gulp js-assets` to code standard check and combine the javascript assets files
* `gulp js-managers` to code standard check and combine the javascript managers files

There are some configuration options. For these you can change the gulpsite.js file. The following options are available:
* `useBrowserSync`: `true` or `false` to enable or disable BrowserSync (default: `true`)
* `browserSync`: Some BrowserSync options. See https://www.browsersync.io/docs/options for available options (default: `{ enabled: true, logLevel: 'info', open: 'local' }`)
* `staticFolder`: Path to where the static files (sass, images, javascript) are located (default: `static`)

## PageSpeed Insights

PageSpeed Insights is also enabled. You can run `gulp psi` to show pagespeed for both mobile and desktop.

## Questions?

Feel free to contact me on [fabian@finalist.com](mailto:fabian@finalist.com)
