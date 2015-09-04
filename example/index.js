// load crystal
var Crystal = require('crystal');

// create project
var project = new Crystal({
  name: 'My API',
  description: 'this is my API',
  path: './myapi',
  imports: {
    'crystal/bower': '~0.3.5',
    'crystal/license': '~0.2.4',
    'crystal/npm': '~0.2.5',
    'crystal/readme': '~0.2.2'
  },
  outputs: [{
    // generate a bower.json file
    generator: 'bower.PackageGenerator',
    spec: {
      name: 'my-api',
      version: '$version',
      dependencies: {
        
      }
    }
  },{
    // generate a LICENSE file
    generator: 'license.MITGenerator',
    spec: {
      copyright: '2015 Crystal'
    }
  },{
    // generate a README.md file
    generator: 'readme.ReadmeGenerator',
    spec: {
      name: '$name',
      description: '$description'
    }
  }],
  scripts: {
    build: ['npm update && bower install']
    run: ['coffee src/app.coffee']
  }
});

// update project (and its imports)
project.update();

// build project
project.build({ force: true });

// run project
project.run();