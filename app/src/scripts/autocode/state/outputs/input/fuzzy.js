autocode.state['outputs/input/fuzzy'] = function(e) {
  var field = $(this);
  var value = field.val();
  
  if (value.substr(0, 1) != '$') {
    autocode.fuzzy.close();
    return;
  }
  
  value = value.substr(1);
  
  var variable, variables = [];
  for (var variable_name in autocode.project) {
    variable = autocode.project[variable_name];
    if (variable_name.match(new RegExp(value, 'i'))) {
      variables.push({
        icon: 'variable-icon',
        state: 'outputs/add/variable?name=' + variable_name,
        text: variable_name
      });
    }
  }
  autocode.fuzzy.open({
    rows: variables,
    target: $(this),
    value: value
  });
};