// folder and glob exports for gulptasks
module.exports = {
  useBrowserSync: true,
  staticFolder: 'static',
  browserSync: {
    enabled: true,
    logLevel: 'info',
    open: 'local'
  },
  paths: {
    sprite: {
      src: 'static/sprite/*',
      svg: 'static/images/sprite.svg'
    },
    templates: {
      src: 'static/tpl/'
    }
  }
};
