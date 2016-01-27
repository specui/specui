autocode.resize.versionsInit = function() {
  var versions_init = $('#versions-init');
  versions_init.css({
    left: ($(window).width() - versions_init.outerWidth()) / 2,
    top: ($(window).height() - versions_init.outerHeight()) / 2
  });
};