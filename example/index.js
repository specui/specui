var crystal = require('../lib/crystal');

var project = new crystal({
  name: 'My API',
  description: 'this is my API',
  path: './myapi',
  imports: {
    'crystal/license': '~0.2.4',
    'crystal/readme': '~0.2.2'
  },
  outputs: [{
    generator: 'license.MITGenerator',
    spec: {
      copyright: '2015 Crystal'
    }
  },{
    generator: 'readme.ReadmeGenerator',
    spec: {
      name: '$name',
      description: '$description'
    }
  }]
});
project.build({ force: true });