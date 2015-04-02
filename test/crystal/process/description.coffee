crystal = require '../../../src/code/crystal'

describe 'crystal', () ->
  describe 'process', () ->
    describe 'description', () ->
      it 'should be exactly the same', () ->
        config = {
          name: 'test'
          version: '0.1.0'
          description: 'Test Description'
        }
        project = new crystal config
        project.process(config).description.should.be.exactly(config.description)