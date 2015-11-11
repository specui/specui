autocode.action.loadScript = function(opts) {
  opts = opts || {};
  
  autocode.data.current.script = opts.name || autocode.data.current.script;
  autocode.data.current.commands = autocode.project.scripts[autocode.data.current.script];
  
  $('#scripts-content-container .table a').removeClass('selected');
  $('#scripts-' + opts.name).addClass('selected');
  
  if (!autocode.project.scripts || !autocode.project.scripts[autocode.data.current.script]) {
    $('#scripts-commands').html('<h3>There are no commands for ' + autocode.data.current.script.toUpperCase() + '. <a onclick="autocode.action.addCommand()">Click here</a> to add one.</h3>');
    return;
  }
  
  $('#scripts-commands').text('');
  
  var commands = autocode.project.scripts[autocode.data.current.script];
  
  var command, command_html;
  for (var i in commands) {
    command = commands[i];
    
    command_html = '<div class="field">';
    if (command.name) {
      command_html += '<h3>';
      command_html += command.name;
      command_html += '</h3>';
    }
    command_html += '<code class="value" onclick="autocode.action.editCommand({ index: ' + i + ' })">';
    if (command.description) {
      command_html += '<span class="icon info-icon" data-hint="' + command.description + '"></span> ';
    }
    command_html += command.command
    command_html += '</code>';
    command_html += '</div>';
    
    $('#scripts-commands').append(command_html);
  }
  
  autocode.hint.init();
  
  autocode.resize.all();
};