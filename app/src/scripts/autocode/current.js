autocode.current = {
  fromExports: function(items, type) {
    if (!autocode.project.exports) {
      return {};
    }
    
    for (var export_name in autocode.project.exports) {
      Export = autocode.project.exports[export_name];
      if (Export.type == type) {
        items[export_name] = Export;
      }
    }
    
    return items;
  },
  fromImports: function(items, type) {
    if (!autocode.data[type]) {
      return {};
    }
    
    for (var import_name in autocode.data[type]) {
      items[import_name] = autocode.data[type][import_name];
    }
    
    return items;
  },
  generators: function() {
    var generators = {};
    generators = autocode.current.fromExports(generators, 'generator');
    generators = autocode.current.fromImports(generators, 'generators');
    return schemas;
  },
  helpers: function() {
    var helpers = {};
    helpers = autocode.current.fromExports(helpers, 'helper');
    helpers = autocode.current.fromImports(helpers, 'helpers');
    return helpers;
  },
  schemas: function() {
    var schemas = {};
    schemas = autocode.current.fromExports(schemas, 'schema');
    schemas = autocode.current.fromImports(schemas, 'schemas');
    return schemas;
  }
};