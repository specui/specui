autocode.state['output'] = function() {
  autocode.action.toggleColumn('output-content', 1);
  autocode.action.toggleSection('output');
  
  if (autocode.data.output || (autocode.project.outputs && autocode.project.imports)) {
    $('#output-content-container .table').empty();
    
    if (!autocode.data.output) {
      autocode.action.generate();
    } else {
      $('#output-content-container .content-left').replaceWith('<aside class="column content-left"></aside>');
      
      $('#output-content-container .content-left').on("changed.jstree", function (e, data) {
        if (data.node.children && data.node.children.length) {
          return;
        }
        
        autocode.ws.io.emit('contents', {
          config: autocode.project,
          project: autocode.repo.split('/')[1],
          user: autocode.repo.split('/')[0],
          file: data.instance.get_path(data.node,'/')
        });
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
    
    $('#output-init').hide();
    $('#output-content-container').show();
    
  } else {
    $('#output-init').show();
    $('#output-content-container').hide();
  }
  
  autocode.resize.all();
};