autocode.action.toggleSection = function(name, section) {
  switch (true) {
    case autocode.data.current.tab == 'config': {
      var value = $('#config-content .CodeMirror')[0].CodeMirror.getValue();
      autocode.project = jsyaml.safeLoad(value);
      break;
    }
    case autocode.data.current.tab == 'exports': {
      break;
    }
    case autocode.data.current.tab == 'imports': {
      break;
    }
    case 'outputs': {
      break;
    }
    case autocode.data.current.tab == 'overview' && autocode.data.current.subtab == 'author': {
      var author_form = $('#overview-author-content form');
      var project_author_name = author_form.find('input[name="name"]').val();
      var project_author_email = author_form.find('input[name="email"]').val();
      var project_author_url = author_form.find('input[name="url"]').val();
      var project_copyright = author_form.find('input[name="copyright"]').val();
      
      if (!project_author_name.length && !project_author_email.length && !project_author_url.length) {
        delete(autocode.project.author);
      } else {
        if (project_author_name.length) {
          autocode.project.author.name = project_author_name;
        } else {
          delete(autocode.project.author.name);
        }
        
        if (project_author_email.length) {
          autocode.project.author.email = project_author_email;
        } else {
          delete(autocode.project.author.email);
        }
        
        if (project_author_url.length) {
          autocode.project.author.url = project_author_url;
        } else {
          delete(autocode.project.author.url);
        }
      }
      
      if (project_copyright.length) {
        autocode.project.copyright = project_copyright;
      } else {
        delete(autocode.project.copyright);
      }
      
      break;
    }
    case autocode.data.current.tab == 'overview' && autocode.data.current.subtab == 'general': {
      var general_form = $('#overview-general-content form');
      var project_name = general_form.find('input[name="name"]').val();
      var project_description = general_form.find('textarea[name="description"]').val();
      var project_url = general_form.find('input[name="url"]').val();
      
      if (project_name.length) {
        autocode.project.name = project_name;
      } else {
        delete(autocode.project.name);
      }
      
      if (project_description.length) {
        autocode.project.description = project_description;
      } else {
        delete(autocode.project.description);
      }
      
      if (project_url.length) {
        autocode.project.url = project_url;
      } else {
        delete(autocode.project.url);
      }
      
      break;
    }
  }
  
  autocode.data.current.tab = name;
  autocode.data.current.subtab = section;
  
  $('.content, .tab').removeClass('selected');
  $('#' + name + '-content, #' + name + '-tab').addClass('selected');
  $('#' + name + '-' + section + '-content').addClass('selected');
  $('#' + name + '-content .subtab').removeClass('selected');
  $('#' + name + '-' + section + '-subtab').addClass('selected');
};