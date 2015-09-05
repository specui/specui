// load crystal
var Crystal = require('../lib/crystal');

// create project
var project = new Crystal({
  name: 'My App',
  description: 'this is my app',
  path: './output/myapp',
  imports: {
    'mymod': '../mymod',
    'crystal/license': '~0.2.4'
  },
  outputs: [{
    // generate a README.md file
    generator: 'mymod.ReadmeGenerator',
    spec: {
      name: '$name',
      description: '$description'
    }
  },{
    // generate a LICENSE file
    generator: 'license.MITGenerator',
    spec: {
      copyright: '2015 Crystal'
    }
  }]
});

// save project
project.save();

// update project (and its imports)
//project.update();

// build project
project.build();