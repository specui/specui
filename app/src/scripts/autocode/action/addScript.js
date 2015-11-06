autocode.action.addScript = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/AddScript.json',
    xhr: true,
    ready: function(form) {
      form.fields.script.autocomplete = false;
      
      form.fields.script.keyup = function() {
        var rows = [], script_name, scripts = ['build','run','stop'];
        for (var i in scripts) {
          script_name = scripts[i];
          if (script_name.match(new RegExp(value, 'i'))) {
            rows.push({
              action: {
                name: 'addScriptName',
                data: { name: script_name }
              },
              icon: script_name + '-icon black',
              text: script_name
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: rows,
          target: $('#popup input[name="script"]'),
          value: value
        });
      };
      
      autocode.popup.open({
        title: 'Add Script',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      // validate script
      if (['build','run','stop'].indexOf(data.script) === -1) {
        autocode.popup.error('Script does not exist.');
        return false;
      }
      
      if (!autocode.project.scripts) {
        autocode.project.scripts = {};
      }
      autocode.project.scripts[data.script] = [];
      
      $('#popup, #overlay').fadeOut(function() {
        autocode.popup.close();
      });
      
      autocode.state['scripts']();
      
      return false;
    }
  });
};