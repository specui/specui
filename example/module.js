// load crystal
var Crystal = require('../lib/crystal');

// create module
var mod = new Crystal({
  path: './output/mymod',
  name: 'My Module',
  description: 'This is my module.',
  imports: {
    'crystal/handlebars': '~0.2.3'
  },
  exports: {
    ReadmeGenerator: {
      engine: 'handlebars.HandlebarsEngine',
      filename: 'README.md',
      schema: {
        type: 'object',
        properties: {
          name: {
            required: true,
            type: 'string'
          },
          description: {
            required: true,
            type: 'string'
          }
        }
      },
      template: "# {{{name}}}\n\n{{{description}}}",
      type: 'generator'
    }
  }
});

// save module
mod.save();

// update module
mod.update();

// build module
mod.build();