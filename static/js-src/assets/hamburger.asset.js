(function ($) {
  "use strict";

  function HamburgerMenu(options, context) {

    var view = {
      defaults: {},

      init: function (options) {
        view.manager = options.manager;
        view.header = options.header;
        view.headerTop = view.header.find('.header-top');
        view.headerBottom = view.header.find('.header-bottom');
        view.hamburger = view.headerBottom.find('.hamburger');

        view.changedItem = [];
        view.isTouchSupported = "ontouchend" in document;
        view.ifTouchElseClick = ($('html.touch', context).length > 0) ? 'touchstart' : 'click';
      },

      startOnResize: function (customFunction, args) {
        // intermediateArray is there so .apply() passes on the arguments
        // as 1 variable instead of passing each value in the array as
        // separate arguments.
        var intermediateArray = [];
        intermediateArray.push(args);
      },

      stopOnResize: function () {
        $(window).off('resize');
      },

      moveItem: function (item, moveTo, option) {
        if (!option) {
          option = 'before';
        }

        var placing = {
          'prepend': function (moveTo, item) {
            $(moveTo).prepend($(item));
          },
          'append': function (moveTo, item) {
            $(moveTo).append($(item));
          },
          'after': function (moveTo, item) {
            $(moveTo).after($(item));
          },
          'before': function (moveTo, item) {
            $(moveTo).before($(item));
          }
        };

        placing[option](moveTo, item);
      },

      fixHeight: function (items, option) {
        $(items).attr('style', '');

        var heights = [];
        var maxHeight;

        $(items).each(function (index) {
          heights.push($(this).height());
        });

        maxHeight = Math.max.apply(this, heights);

        if (option != 'kill') {
          $(items).height(maxHeight);
        }
      },

      createHamburger: function (option) {
        var mainMenu = view.header.find('nav.main-menu').clone();

        var hamburger = $('<div/>').addClass('hamburger');
        var hamburgerButton = $('<div/>').addClass('hamburger-button');
        var hamburgerInner = $('<div/>').addClass('hamburger-inner');

        hamburger.append(hamburgerInner);
        hamburgerInner.append(mainMenu);

        if (view.header.find('.hamburger').length === 0) {
          view.header.find('.header-top-right').append(hamburgerButton);
          view.header.append(hamburger);
          view.hamburgerOpen(hamburgerButton);
        }

        if (option == 'kill') {
          view.header.find('.hamburger, .hamburger-button').remove();
        }
      },

      hamburgerOpen: function(button) {
        button.bind(view.ifTouchElseClick, function () {
          if (view.header.find('.hamburger-inner').css('display') == 'block') {
            view.header.find('.hamburger-inner').slideUp(300);
          }
          else {
            view.header.find('.hamburger-inner').delay(100).slideDown(300);
          }

          button.toggleClass('active');
        });
      }
    };

    view.init(options);

    return view;
  }

  // Make app globally accessible.
  window.HamburgerMenu = HamburgerMenu;

})(jQuery);
