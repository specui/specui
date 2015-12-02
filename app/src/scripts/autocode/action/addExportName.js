autocode.action.addExportName = function(opts) {
  $('#popup input[name="type"]').val(opts.name);
  
  /*
  switch (true) {
    case ['engine','helper','processor','schema','spec','transformer'].indexOf(opts.name.toLowerCase()) !== -1: {
      $('#popup input[name="engine"]').parents('.field').hide();
      $('#popup input[name="filename"]').parents('.field').hide();
      $('#popup input[name="format"]').parents('.field').hide();
      $('#popup input[name="schema"]').parents('.field').hide();
      $('#popup textarea[name="template"]').parents('.field').hide();
      break;
    }
    case opts.name.toLowerCase() == 'generator': {
      $('#popup input[name="engine"]').parents('.field').show();
      $('#popup input[name="filename"]').parents('.field').show();
      $('#popup input[name="format"]').parents('.field').show();
      $('#popup input[name="schema"]').parents('.field').show();
      $('#popup textarea[name="template"]').parents('.field').show();
      break;
    }
  }
  */
  
  autocode.fuzzy.close();
  
  autocode.resize.popup();
};