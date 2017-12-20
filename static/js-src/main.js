$(document).ready(function () {
  // Create responsiveManager class
  var responsiveManager = new ResponsiveManager();

  // Log every media query change
  _.forEach(responsiveManager.media, function (value, key) {
    responsiveManager.addListener(value, function () {
      console.log(key);
    });
  });

  // Add hamburger menu.
  var hamburger = new HamburgerMenu({header: $('header'), manager: responsiveManager});
  responsiveManager.addListener(responsiveManager.media.small, function() {
    hamburger.createHamburger();
  });
  responsiveManager.addListener(responsiveManager.media.big, function() {
    hamburger.createHamburger('kill');
  });

  responsiveManager.activateResponsiveListeners();
});
