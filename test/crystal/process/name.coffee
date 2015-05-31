crystal = require '../../../src/crystal'

describe 'crystal', () ->
  describe 'process', () ->
    describe 'name', () ->
      it 'should be exactly the same', () ->
        config = {
          name: 'name'
          version: '0.1.0'
        }
        project = new crystal config
        #project.process(config).name.should.be.exactly(config.name)