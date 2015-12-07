autocode.action.addExportHelper = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    formula: 'formulas/forms/Helper.json',
    xhr: true,
    ready: function(form) {
      form.fields.helper.autocomplete = false;
      form.fields.helper.focus = function(o) {
        $(o).trigger('keyup');
      };
      form.fields.helper.keyup = function() {
        var rows = [], helper_name, helpers = autocode.current.helpers();
        for (var helper_name in helpers) {
          if (helper_name.match(new RegExp(value, 'i'))) {
            rows.push({
              click: function() {
                // update helper field
                $('#popup input[name="helper"]').val($(this).text());
                
                // close fuzzy
                autocode.fuzzy.close();
              },
              text: helper_name
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: rows,
          target: $('#popup input[name="helper"]'),
          value: value
        });
      };
      
      autocode.popup.open({
        title: 'Edit Export Helper',
        content: form.toString()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (!autocode.project.exports[autocode.data.current.export].helper) {
        autocode.project.exports[autocode.data.current.export].helper = {};
      }
      autocode.project.exports[autocode.data.current.export].helper[data.alias] = data.helper;
      autocode.project.exports[autocode.data.current.export].helper = autocode.object.sort(autocode.project.exports[autocode.data.current.export].helper);
      
      autocode.action.loadExport({ repo: data.name });
      
      autocode.popup.close();
      
      return false;
    }
  });
};