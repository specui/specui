autocode.action.editOutputProcessor = function(opts) {
  autocode.popup.open({
    title: 'Loading...'
  });
  autocode.popover.close();
  
  new formulator({
    data: {
      processor: opts.processor
    },
    formula: 'formulas/forms/Processor.json',
    ready: function(form) {
      form.fields.processor.autocomplete = false;
      form.fields.processor.focus = function(o) {
        $(this).trigger('keyup');
      };
      form.fields.processor.keyup = function() {
        var rows = [],
          processor_name,
          processors = autocode.current.processors(),
          value = $(this).val();
        for (var processor_name in processors) {
          if (
            processor_name == opts.processor
            ||
            (
              processor_name.match(new RegExp(value, 'i'))
              &&
              (
                !autocode.project.outputs[autocode.data.current.output].processor
                || autocode.project.outputs[autocode.data.current.output].processor.indexOf(processor_name) === -1
              )
            )
          ) {
            rows.push({
              click: function() {
                // update processor field
                $('#popup input[name="processor"]').val($(this).text());
                
                // close fuzzy
                autocode.fuzzy.close();
              },
              text: processor_name
            });
          }
        }
        
        autocode.fuzzy.open({
          rows: rows,
          target: $('#popup input[name="processor"]'),
          value: value
        });
      };
      
      form.buttons = {
        edit: {
          label: 'Edit Processor',
          type: 'submit'
        },
        remove: {
          class: 'delete',
          click: function() {
            autocode.action.removeOutputProcessor({
              processor: opts.processor
            });
          },
          label: 'Delete Processor',
          type: 'button'
        }
      };
      
      autocode.popup.open({
        title: 'Edit Processor',
        content: form.toObject()
      });
    },
    submit: function(data) {
      // update processor
      if (data.processor != opts.processor) {
        var processor_index = autocode.project.outputs[autocode.data.current.output].processor.indexOf(opts.processor);
        if (processor_index !== -1) {
          autocode.project.outputs[autocode.data.current.output].processor.splice(processor_index, 1);
        }
      }
      autocode.project.outputs[autocode.data.current.output].processor.push(data.processor);
      
      // reload output
      autocode.action.loadOutput({ output: autocode.data.current.output });
      
      // close popup
      autocode.popup.close();
    }
  });
};