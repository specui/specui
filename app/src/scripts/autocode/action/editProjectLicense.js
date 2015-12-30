autocode.action.editProjectLicense = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      license: autocode.project.license
    },
    formula: 'formulas/forms/License.json',
    xhr: true,
    ready: function(form) {
      form.fields.license.autocomplete = false;
      form.fields.license.focus = function(o) {
        $(this).trigger('keyup');
      };
      form.fields.license.keyup = function() {
        var rows = [],
          license_name,
          licenses = autocode.data.licenses,
          value = $(this).val();
        for (var license_name in licenses) {
          if (license_name.match(new RegExp(value, 'i'))) {
            rows.push({
              click: function() {
                // update license field
                $('#popup input[name="license"]').val($(this).data('value'));
                
                // close fuzzy
                autocode.fuzzy.close();
              },
              text: license_name + '<span>' + licenses[license_name] + '</span>',
              value: license_name
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: rows,
          target: $('#popup input[name="license"]'),
          value: value
        });
      };
      
      autocode.popup.open({
        title: 'Edit Project License',
        content: form.toObject()
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });
      
      if (data.license && data.license.length) {
        autocode.project.license = data.license;
      } else {
        delete(autocode.project.license);
      }
      
      autocode.popup.close();
      
      autocode.state['overview/general']();
      
      return false;
    }
  });
};