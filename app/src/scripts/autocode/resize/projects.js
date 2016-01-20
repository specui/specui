autocode.resize.projects = function() {
  var size = $('#projects-content a').outerWidth();
  $('#projects-content .image').css({
    backgroundSize: (size-40) + 'px ' + (size-40) + 'px',
    height: size - 20
  });
};