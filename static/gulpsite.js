// folder and glob exports for gulptasks
module.exports = {
  useBrowserSync: true,
  staticFolder: 'static',
  browserSync: {
    enabled: true,
    logLevel: 'info',
    open: 'local'
  },
  spriteSource: 'static/sprite/*',
  spriteDestination: 'static/images/sprite.svg',
  spriteTemplate: 'static/tpl/'
};
