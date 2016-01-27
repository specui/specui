autocode.state['output'] = function() {
  autocode.action.toggleColumn('output-content', 1);
  autocode.action.toggleSection('output');
  
  $('#output-content-container .table').empty();
  
  $('#output-content-container .content-left').replaceWith('<aside class="column content-left"></aside>');
  
  if (autocode.data.output && autocode.data.output.files) {
    $('#output-content-container .content-left').on("changed.jstree", function (e, data) {
      if (data.node.children && data.node.children.length) {
        return;
      }
      
      autocode.data.current.file = data.instance.get_path(data.node,'/');
      
      autocode.action.toggleCode('spec');
    });
    $('#output-content-container .content-left').on("ready.jstree", function (e, data) {
      $('#output-content-container .icon').each(function() {
        var filename = $(this).parent().text();
        var icon = autocode.file.icon(filename);
        $(this).addClass(icon + '-icon');
      });
      
      $('.jstree-anchor').first().click();
    });
    
    $('#output-content-container .content-left').on("before_open.jstree", function (e, data) {
      $('#output-content-container .icon').each(function() {
        var filename = $(this).parent().text();
        var icon = autocode.file.icon(filename);
        $(this).addClass(icon + '-icon');
      });
    });
    
    $('#output-content-container .content-left').jstree({
      core: {
        data: autocode.data.output.files,
        multiple: false,
        themes: {
          dots: false
        }
      }
    });
  }
  
  $('#output-content-container').show();
  
  autocode.resize.all();
};