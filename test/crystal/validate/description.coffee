crystal = require '../../../src/crystal'

describe 'crystal', () ->
  describe 'validate', () ->
    describe 'description', () ->
      it 'should be optional', () ->
        config = {
          name: 'test'
          version: '1.0.0'
        }
        (-> new crystal config)
          .should.not.throw "'description' is required."
        
      it 'should be a string', () ->
        # object description
        config = {
          name: 'test'
          version: '1.0.0'
          description: {}
        }
        (-> new crystal config)
          .should.throw "'description' must be of type (string)."