autocode.action.loadImport = function(opts) {
  autocode.action.toggleColumn('imports-content', 2);
  
  autocode.data.current.import = opts.repo;
  
  $('#imports-content-container .table a').removeClass('selected');
  $('#imports-content-container .table a').eq(opts.index).addClass('selected');
  
  $('#imports-name .value').text(opts.repo);
  $('#imports-version .value').text(autocode.project.imports[opts.repo]);
  $('#imports-content-readme').text('');
  
  $('#imports-tabs').hide();
  
  autocode.loader.open();
  
  autocode.api.config.get({
    data: {
      repo: opts.repo
    },
    success: function(data) {
      var config = jsyaml.safeLoad(data.config);
      
      autocode.api.readme.get({
        data: {
          repo: opts.repo
        },
        success: function(data) {
          autocode.loader.close();
          
          var button = $(document.createElement('button'));
          button.attr('type', 'button');
          button.click(function() {
            var generator = $(this).prev().prev().text();
            if (!autocode.project.outputs) {
              autocode.project.outputs = [];
            }
            var outputs = jsyaml.safeLoad($(this).next().next().next().find('.CodeMirror')[0].CodeMirror.getValue()).outputs;
            for (var i in outputs) {
              for (var n = 0; n < autocode.project.outputs.length; n++) {
                if (autocode.project.outputs[n].generator == outputs[i].generator) {
                  autocode.hint.open({
                    target: $('#config-tab'),
                    timer: 3000,
                    text: 'Generator has already been added: ' + outputs[i].generator,
                    top: $('header').outerHeight() + 10
                  });
                  autocode.resize.all();
                  return;
                }
              }
              autocode.project.outputs.push(outputs[i]);
            }
            autocode.hint.open({
              target: $('#config-tab'),
              timer: 3000,
              text: 'Example added for ' + generator + '.',
              top: $('header').outerHeight() + 10
            });
            autocode.resize.all();
          });
          button.css('float', 'right');
          button.text('Add Example to Config');
          
          var readme = marked(data.readme);
          readme = readme.replace(/id="(.*?)"/g, 'class="$1"');
          $('#imports-content-readme').html(readme);
          $('#imports-content-readme').find('.example-input').before(button);
          $('#imports-content-readme').find('p a img').remove();
          $('#imports-content-readme').find('#install').remove();
          $('#imports-content-readme').find('p').eq(2).remove();
          $('#imports-content-readme').find('pre').eq(0).remove();
          $('#imports-content-readme').find('p').eq(2).remove();
          $('#imports-content-readme').find('pre').eq(0).remove();
          
          $('.lang-coffee').each(function() {
            var value = $(this).text();
            value = value.replace(/\n$/, '');
            $(this).text('');
            
            CodeMirror(this, {
              lineNumbers: true,
              value: value,
              mode: 'coffeescript',
              readOnly: true,
              viewportMargin: Infinity
            });
          });
          
          $('.lang-dockerfile').each(function() {
            var value = $(this).text();
            value = value.replace(/\n$/, '');
            $(this).text('');
            
            CodeMirror(this, {
              lineNumbers: true,
              value: value,
              mode: 'dockerfile',
              readOnly: true,
              viewportMargin: Infinity
            });
          });
          
          $('.lang-go').each(function() {
            var value = $(this).text();
            value = value.replace(/\n$/, '');
            $(this).text('');
            
            CodeMirror(this, {
              lineNumbers: true,
              value: value,
              mode: 'go',
              readOnly: true,
              viewportMargin: Infinity
            });
          });
          
          $('.lang-html').each(function() {
            var value = $(this).text();
            value = value.replace(/\n$/, '');
            $(this).text('');
            
            CodeMirror(this, {
              lineNumbers: true,
              value: value,
              mode: 'htmlmixed',
              readOnly: true,
              viewportMargin: Infinity
            });
          });
          
          $('.lang-js').each(function() {
            var value = $(this).text();
            value = value.replace(/\n$/, '');
            $(this).text('');
            
            CodeMirror(this, {
              lineNumbers: true,
              mode: 'javascript',
              value: value,
              readOnly: true,
              viewportMargin: Infinity
            });
          });
          
          $('.lang-json').each(function() {
            var value = $(this).text();
            value = value.replace(/\n$/, '');
            $(this).text('');
            
            CodeMirror(this, {
              lineNumbers: true,
              value: value,
              mode: 'javascript',
              readOnly: true,
              viewportMargin: Infinity
            });
          });
          
          $('.lang-python').each(function() {
            var value = $(this).text();
            value = value.replace(/\n$/, '');
            $(this).text('');
            
            CodeMirror(this, {
              lineNumbers: true,
              mode: 'python',
              value: value,
              readOnly: true,
              viewportMargin: Infinity
            });
          });
          
          $('.lang-yaml').each(function() {
            var value = $(this).text();
            value = value.replace(/\n$/, '');
            $(this).text('');
            
            CodeMirror(this, {
              lineNumbers: true,
              value: value,
              mode: 'yaml',
              readOnly: true,
              viewportMargin: Infinity
            });
          });
          
          $('.lang-sh').each(function() {
            var value = $(this).text();
            value = value.replace(/\n$/, '');
            $(this).text('');
            
            CodeMirror(this, {
              lineNumbers: true,
              value: value,
              mode: 'shell',
              readOnly: true,
              viewportMargin: Infinity
            });
          });
          
          $('.lang-text').each(function() {
            var value = $(this).text();
            value = value.replace(/\n$/, '');
            $(this).text('');
            
            CodeMirror(this, {
              lineNumbers: true,
              value: value,
              readOnly: true,
              viewportMargin: Infinity
            });
          });
          
          if (autocode.project.imports) {
            $('#imports-content-container .content-right').show();
          } else {
            $('#imports-content-container .content-right').hide();
          }
          
          $('#imports-tabs').text('').show();
          
          var tab, tabs = [], export_type;
          for (var export_name in config.exports) {
            export_type = config.exports[export_name].type + 's';
            if (tabs.indexOf(export_type) === -1) {
              tabs.push(export_type);
            }
          }
          for (var i = 0; i < tabs.length; i++) {
            tab = tabs[i];
            $('#imports-tabs').append('<a' + (i == 0 ? ' class="selected"' : '') + ' id="imports-' + tab + '-tab" onclick="autocode.action.importsTab({ tab: \'' + tab + '\' })">' + tab.substr(0,1).toUpperCase() + tab.substr(1) + '</a>');
          }
          
          autocode.resize.content();
        }
      });
    }
  });
};