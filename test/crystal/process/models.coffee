crystal = require '../../../src/code/crystal'

describe 'crystal', () ->
  describe 'process', () ->
    config = {
      name: 'test'
      version: '0.1.0'
      description: 'Test Description'
      spec:
        models:
          user:
            details:
              username:
                type: 'text'
    }
    
    project = new crystal config
    spec = project.process(config)
    
    describe 'model', () ->
      it 'should be an object with objects', () ->
        spec.models.should.be.instanceof(Object)
        for model in spec.models
          model.should.be.instanceof(Object)
          model.detail.should.be.instanceof(Object)
          model.details.should.be.instanceof(Array)
          model.has.should.be.instanceof(Object)
          model.name.should.be.instanceof(Object)
          
    describe 'models', () ->
      it 'should be an array of objects', () ->
        spec.models.should.be.instanceof(Array)
        for model in spec.models
          model.should.be.instanceof(Object)
          model.detail.should.be.instanceof(Object)
          model.details.should.be.instanceof(Array)
          model.has.should.be.instanceof(Object)
          model.name.should.be.instanceof(Object)