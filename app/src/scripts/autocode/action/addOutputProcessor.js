autocode.action.addOutputProcessor = function() {
  var current_processors = autocode.current.processors();
  if (
    autocode.project.outputs[autocode.data.current.output].processor
    && autocode.project.outputs[autocode.data.current.output].processor.length == autocode.object.count(current_processors)
  ) {
    autocode.popup.open({
      title: 'Added all processors',
      content: "You've added all available processors."
    });
    return;
  }
  
  autocode.popup.open({
    title: 'Loading...'
  });
  
  new formulator({
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
            processor_name.match(new RegExp(value, 'i'))
            &&
            (
              !autocode.project.outputs[autocode.data.current.output].processor
              || autocode.project.outputs[autocode.data.current.output].processor.indexOf(processor_name) === -1
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
      
      autocode.popup.open({
        title: 'Add Processor',
        content: form.toObject()
      });
    },
    submit: function(data) {
      // add processor to output
      if (!autocode.project.outputs[autocode.data.current.output].processor) {
        autocode.project.outputs[autocode.data.current.output].processor = [];
      } else if (typeof(autocode.project.outputs[autocode.data.current.output].processor) == 'string') {
        autocode.project.outputs[autocode.data.current.output].processor = [autocode.project.outputs[autocode.data.current.output].processor];
      }
      autocode.project.outputs[autocode.data.current.output].processor.push(data.processor);
      
      // sort output's processors
      autocode.project.outputs[autocode.data.current.output].processor = autocode.array.sort(autocode.project.outputs[autocode.data.current.output].processor);
      
      // reload output
      autocode.action.loadOutput({ repo: data.name });
      
      // close popup
      autocode.popup.close();
    }
  });
};