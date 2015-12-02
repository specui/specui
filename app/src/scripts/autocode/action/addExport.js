autocode.action.addExport = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/AddExport.json',
    xhr: true,
    ready: function(form) {
      form.fields.type.autocomplete = false;
      form.fields.type.focus = function(o) {
        $(o).trigger('keyup');
      };
      form.fields.type.keyup = function() {
        var rows = [], type_name, types = autocode.data.exportTypes;
        for (var i in types) {
          type_name = types[i];
          if (type_name.match(new RegExp(value, 'i'))) {
            rows.push({
              action: {
                name: 'addExportName',
                data: { name: autocode.string.capitalize(type_name) }
              },
              icon: type_name.toLowerCase() + '-icon black',
              text: autocode.string.capitalize(type_name)
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: rows,
          target: $('#popup input[name="type"]'),
          value: value
        });
      };
      
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
      
      form.fields.format.autocomplete = false;
      form.fields.format.focus = function(o) {
        $(o).trigger('keyup');
      };
      form.fields.format.keyup = function() {
        var rows = [], type_name, types = autocode.data.formats;
        for (var i in types) {
          type_name = types[i];
          if (type_name.match(new RegExp(value, 'i'))) {
            rows.push({
              action: {
                name: 'addExportName',
                data: { name: type_name }
              },
              icon: type_name.toLowerCase() + '-icon black',
              text: type_name
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: rows,
          target: $('#popup input[name="format"]'),
          value: value
        });
      };
      
      autocode.popup.open({
        title: 'Add Export',
        content: form.toString()
      });
      
      $('#popup input[name="engine"]').parents('.field').hide();
      $('#popup input[name="filename"]').parents('.field').hide();
      $('#popup input[name="format"]').parents('.field').hide();
      $('#popup input[name="schema"]').parents('.field').hide();
      $('#popup textarea[name="template"]').parents('.field').hide();
      
      autocode.resize.popup();
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        var value = $(this).val();
        if (value.length) {
          data[$(this).attr('name')] = $(this).val();
        }
      });
      
      if (!data.name) {
        autocode.popup.error('Name is required.');
        return false;
      } else if (!data.name.match(/^[a-z0-9]+$/i)) {
        autocode.popup.error('Name is alphanumeric.');
        return false;
      }
      
      if (data.type) {
        data.type = data.type.toLowerCase();
      }
      if (autocode.data.exportTypes.indexOf(data.type) === -1) {
        autocode.popup.error('Type is invalid.');
        return false;
      }
      
      var name = data.name;
      delete(data.name);
      if (!autocode.project.exports) {
        autocode.project.exports = {};
      }
      autocode.project.exports[name] = data;
      
      // sort exports
      autocode.project.exports = autocode.object.sort(autocode.project.exports);
      
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      autocode.state['exports']();
      
      return false;
    }
  });
};