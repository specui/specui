autocode.action.editorSettings = function() {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      lineNumbers: autocode.editor.lineNumbersEnabled(),
      theme: autocode.editor.getTheme()
    },
    formula: 'formulas/forms/Editor.json',
    xhr: true,
    ready: function(form) {
      form.fields.theme.autocomplete = false;
      form.fields.theme.focus = function(o) {
        $(o).trigger('keyup');
      };
      form.fields.theme.keyup = function() {
        var rows = [], type_name, types = autocode.editor.codemirror.themes;
        for (var i in types) {
          type_name = types[i];
          if (type_name.match(new RegExp(value, 'i'))) {
            rows.push({
              action: {
                name: 'setEditorTheme',
                data: { name: autocode.string.capitalize(type_name) }
              },
              text: autocode.string.capitalize(type_name)
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: rows,
          target: $('#popup input[name="theme"]'),
          value: value
        });
      };
      
      autocode.popup.open({
        title: 'Editor Settings',
        content: '<textarea style="display: none"></textarea>' + form.toString(),
        complete: function() {
          var editor = CodeMirror.fromTextArea($('#popup textarea')[0], {
            lineNumbers: true,
            mode: 'javascript',
            readOnly: true,
            theme: autocode.editor.getTheme()
          });
          
          code_mirror = $('#popup .CodeMirror');
          code_mirror[0].CodeMirror.setValue("function findSequence(goal) {\n  function find(start, history) {\n    if (start == goal)\n      return history;\n    else if (start > goal)\n      return null;\n    else\n      return find(start + 5, \"(\" + history + \" + 5)\") ||\n             find(start * 3, \"(\" + history + \" * 3)\");\n  }\n  return find(1, \"1\");\n}");
          
          autocode.resize.popup();
        }
      });
    },
    submit: function(data) {
      var data = {};
      $('#popup input, #popup select, #popup textarea').each(function() {
        if (!$(this).attr('name') || !$(this).attr('name').length) {
          return;
        }
        if ($(this).attr('type') == 'checkbox') {
          if ($(this).is(':checked')) {
            data[$(this).attr('name')] = true;
          } else {
            data[$(this).attr('name')] = false;
          }
        } else {
          data[$(this).attr('name')] = $(this).val();
        }
      });
      
      data.theme = data.theme.toLowerCase();
      
      if (autocode.editor.codemirror.themes.indexOf(data.theme) === -1) {
        autocode.popup.error('Unknown theme: ' + data.theme);
        return;
      }
      
      console.log(data);
      
      if (data.lineNumbers) {
        autocode.editor.enableLineNumbers();
      } else {
        autocode.editor.disableLineNumbers();
      }
      autocode.editor.setTheme(data.theme);
      
      autocode.fuzzy.close();
      autocode.popup.close();
      
      return false;
    }
  });
};