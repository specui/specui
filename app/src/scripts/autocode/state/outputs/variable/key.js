autocode.state['outputs/output/variable/key'] = function(opts) {
  var value = $(this).val();
  
  if (value.substr(0, 1) != '$') {
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