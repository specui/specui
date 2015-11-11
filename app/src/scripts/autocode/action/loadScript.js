autocode.action.loadScript = function(opts) {
  opts = opts || {};
  
  autocode.data.current.script = opts.name || autocode.data.current.script;
  delete(autocode.data.current.commands);
  
  $('#scripts-content-container .table a').removeClass('selected');
  $('#scripts-' + autocode.data.current.script).addClass('selected');
  
  if (!autocode.project.scripts || !autocode.project.scripts[autocode.data.current.script]) {
    $('#scripts-commands').html('<h3>There are no commands for ' + autocode.data.current.script.toUpperCase() + '. <a onclick="autocode.action.addCommand()">Click here</a> to add one.</h3>');
    autocode.resize.all();
    return;
  }
  
  autocode.data.current.commands = autocode.project.scripts[autocode.data.current.script];
  
  $('#scripts-commands').replaceWith('<div id="scripts-commands"></div>');
  
  var commands = autocode.project.scripts[autocode.data.current.script];
  
  var command, command_html;
  for (var i in commands) {
    command = commands[i];
    
    command_html = '<div class="field move">';
    if (command.command) {
      command_html += '<code class="value" onclick="autocode.action.editCommand({ index: ' + i + ' })">';
      if (command.description) {
        command_html += '<span class="icon info-icon" data-hint="' + command.description + '"></span> ';
      }
      if (command.path) {
        command_html += '<span class="path">' + command.path + '$</span> ';
      }
      command_html += '<span class="code">' + command.command + '</div>';
      command_html += '</code>';
    } else {
      command_html += '<h3 class="value" onclick="autocode.action.editCommandTitle({ index: ' + i + ' })">';
      command_html += command.title;
      command_html += '</h3>';
    }
    command_html += '</div>';
    
    command_html = $(command_html);
    
    $('#scripts-commands').append(command_html);
  }
  
  dragula([$('#scripts-commands')[0]], {
    mirrorContainer: document.body
  }).on('drop', function() {
    autocode.project.scripts[autocode.data.current.script] = [];
    $('#scripts-commands .field').each(function() {
      var script = {};
      if ($(this).find('h3').length) {
        script.title = $(this).find('h3').text();
      } else {
        script.description = $(this).find('.info-icon').data('hint');
        script.command = $(this).find('code .code').text();
        if ($(this).find('.path').length) {
          script.path = $(this).find('.path').text().substr(0, $(this).find('.path').text().length-1);
        }
      }
      autocode.project.scripts[autocode.data.current.script].push(script);
    });
    autocode.action.loadScript();
  });
  
  autocode.hint.init();
  
  autocode.resize.all();
};