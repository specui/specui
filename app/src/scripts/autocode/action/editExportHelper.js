autocode.action.editExportHelper = function(opts) {
  // open popup
  autocode.popup.open({
    title: 'Loading...'
  });
  
  // setup form
  new formulator({
    data: {
      alias: opts.alias,
      helper: autocode.project.exports[autocode.data.current.export].helper[opts.alias]
    },
    formula: 'formulas/forms/Helper.json',
    ready: function(form) {
      form.buttons = {
        edit: {
          label: 'Edit Helper',
          type: 'submit'
        },
        remove: {
          class: 'delete',
          click: function() {
            autocode.action.removeExportHelper({
              alias: opts.alias
            });
          },
          label: 'Delete Helper',
          type: 'button'
        }
      };
      
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
        title: 'Edit Export Helper',
        content: form.toObject()
      });
    },
    submit: function(data) {
      // update helper
      if (data.alias != opts.alias) {
        delete(autocode.project.exports[autocode.data.current.export].helper[opts.alias]);
      }
      autocode.project.exports[autocode.data.current.export].helper[data.alias] = data.helper;
      
      // sort helper
      autocode.project.exports[autocode.data.current.export].helper = autocode.object.sort(autocode.project.exports[autocode.data.current.export].helper);
      
      // reload export
      autocode.action.loadExport({ repo: autocode.data.current.export });
      
      // close popup
      autocode.popup.close();
    }
  });
};