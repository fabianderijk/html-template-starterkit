var ResponsiveManager = function (options) {
  var view = {
    defaults: {
      listenerMap: []
    },

    media: {
      xs: 'screen and (min-width: 0px) and (max-width: 479px)',
      s: 'screen and (min-width: 480px) and (max-width: 929px)',
      m: 'screen and (min-width: 930px) and (max-width: 1079px)',
      l: 'screen and (min-width: 1080px) and (max-width: 1449px)',
      xl: 'screen and (min-width: 1450px)',
      small: 'screen and (max-width: 929px)',
      big: 'screen and (min-width: 930px)'
    },

    addListener: function(trigger, callback, debug) {
      debug = typeof debug !== 'undefined' ? debug : false;
      this.defaults.listenerMap.push({trigger: trigger, callback: callback, debug: debug});
    },

    activateResponsiveListeners: function() {
      var _this = this;
      _.forEach(_this.defaults.listenerMap, function(map, key) {
        if(typeof map.trigger === 'string') {
          enquire.register(map.trigger, {
            setup: function () {
            },
            match: function () {
              map.callback();
            }
          }, true);
        }
        else if(Object.prototype.toString.call(map.trigger) === '[object Array]') {
          _.forEach(map.trigger, function(trigger, key) {
            enquire.register(trigger, {
              match: function () {
                map.callback();
              }
            }, true);
          });
        }
      });
    }
  };

  // Binds methods of an object to the object it_this,
  // makes sure we can use 'this' in every function.
  _.bindAll(ResponsiveManager);

  return view;
};
