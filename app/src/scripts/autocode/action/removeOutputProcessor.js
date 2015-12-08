autocode.action.removeOutputProcessor = function(opts) {
  opts = opts || {};
  
  if (!opts.confirm) {
    var output = autocode.project.outputs[autocode.data.current.output];
    var output_filename = '[ Untitled ]';
    var current_generators = autocode.current.generators();
    
    if (output.filename) {
      output_filename = output.filename;
    } else if (
      output.generator
      && current_generators[output.generator]
      && current_generators[output.generator].filename
    ) {
      output_filename = current_generators[output.generator].filename;
    }
    
    autocode.popup.open({
      title: 'Remove Output Processor',
      content: '<div style="padding-bottom: 10px">Do you really want to remove <b>' + opts.processor + '</b> from <b>' + output_filename + '</b>?</div>'
        + '<button class="delete" onclick="autocode.action.removeOutputProcessor({ processor: \'' + opts.processor + '\', confirm: true })">Yes, Remove Processor</button> <button class="secondary" onclick="autocode.action.closePopup()">No, Keep Processor</button>'
    });
    
    return;
  }
  
  // delete processor
  var processor_index = autocode.project.outputs[autocode.data.current.output].processor.indexOf(opts.processor);
  if (processor_index !== -1) {
    autocode.project.outputs[autocode.data.current.output].processor.splice(processor_index, 1);
  }
  
  // reload output
  autocode.action.loadOutput({ output: autocode.data.current.output });
  
  // close popup
  autocode.popup.close();
};