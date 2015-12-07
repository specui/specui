autocode.state['imports'] = function(opts) {
  opts = opts || {};
  
  autocode.popup.close();
  
  autocode.action.toggleColumn('imports-content', 1, {
    animated: autocode.data.current.tab == 'imports'
      ? true
      : false
  });
  autocode.action.toggleSection('imports');
  
  $('#imports-content-container .table a').remove();
  
  autocode.action.loadImportTab({ tab: opts.tab || 'imported' });
  
  autocode.initState();
  
  if (autocode.project.imports) {
    $('#imports-content-container .content-right').show();
  } else {
    $('#imports-content-container .content-right').hide();
  }
  
  $('#imports-content-container').show();
  
  if (opts.disableSelected !== true && $(window).width() > autocode.mobile.minWidth) {
    $('#imports-content-container .table a').first().click();
  }
  
  if (!autocode.data.modules) {
    autocode.api.modules.get({
      success: function(modules) {
        autocode.data.modules = autocode.array.sort(modules, 'name');
        
        $('#imports-search').keyup(function(e) {
          if (e.keyCode == 13) {
            if (!$(this).val().length) {
              return false;
            }
            var text = $(this).val();
            if ($('#fuzzy a').first().find('.text').length) {
              text = $('#fuzzy a').first().find('.text').text();
            }
            autocode.action.addImport({ repo: text });
            $(this).val('');
            autocode.fuzzy.close();
            return false;
          }
          
          var value = $(this).val();
          
          var mod, modules = [];
          for (var module_i in autocode.data.modules) {
            module_name = autocode.data.modules[module_i].name;
            if (autocode.project.imports && autocode.project.imports[module_name]) {
              continue;
            }
            if (module_name.match(new RegExp(value, 'i'))) {
              modules.push({
                action: {
                  name: 'addImport',
                  data: {
                    repo: module_name
                  }
                },
                icon: 'https://cdn.rawgit.com/' + module_name + '/master/.autocode/icon.svg',
                text: module_name
              });
            }
          }
          autocode.fuzzy.open({
            rows: modules,
            target: $(this),
            value: value
          });
        });
      }
    });
  }
};