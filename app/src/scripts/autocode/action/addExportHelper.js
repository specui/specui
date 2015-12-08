autocode.action.addExportHelper = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  
  new formulator({
    formula: 'formulas/forms/Helper.json',
    ready: function(form) {
      form.fields.helper.autocomplete = false;
      form.fields.helper.focus = function(o) {
        $(this).trigger('keyup');
      };
      form.fields.helper.keyup = function() {
        var rows = [],
          helper_name,
          helpers = autocode.current.helpers(),
          value = $(this).val();
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
        title: 'Add Export Helper',
        content: form.toObject()
      });
    },
    submit: function(data) {
      // add helper to export
      if (!autocode.project.exports[autocode.data.current.export].helper) {
        autocode.project.exports[autocode.data.current.export].helper = {};
      }
      autocode.project.exports[autocode.data.current.export].helper[data.alias] = data.helper;
      
      // sort export's helpers
      autocode.project.exports[autocode.data.current.export].helper = autocode.object.sort(autocode.project.exports[autocode.data.current.export].helper);
      
      // reload export
      autocode.action.loadExport({ repo: data.name });
      
      // close popup
      autocode.popup.close();
    }
  });
};