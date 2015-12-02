autocode.action.editExportEngine = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      engine: autocode.project.exports[autocode.data.current.export].engine
    },
    formula: 'formulas/forms/Engine.json',
    xhr: true,
    ready: function(form) {
      form.fields.engine.autocomplete = false;
      form.fields.engine.focus = function(o) {
        $(o).trigger('keyup');
      };
      form.fields.engine.keyup = function() {
        var engine, engines = [];
        for (var engine_name in autocode.data.engines) {
          engine = autocode.data.engines[engine_name];
          if (engine_name.match(new RegExp(value, 'i'))) {
            engines.push({
              action: {
                name: 'addExportEngine',
                data: { name: engine_name }
              },
              icon: 'https://cdn.rawgit.com/crystal/' + engine_name.split('.')[0] + '/master/.autocode/icon.svg',
              text: engine_name
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: engines,
          target: $('#popup input[name="engine"]'),
          value: value
        });
      };
      
      autocode.popup.open({
        title: 'Edit Export Engine',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.engine && data.engine.length && !autocode.data.engines[data.engine]) {
        autocode.popup.error('Unknown engine.');
        return false;
      }
      
      if (data.engine && data.engine.length) {
        autocode.project.exports[autocode.data.current.export].engine = data.engine;
      } else {
        delete(autocode.project.exports[autocode.data.current.export].engine);
      }
      
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};