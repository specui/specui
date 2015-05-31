crystal = require '../../../src/crystal'

describe 'crystal', () ->
  describe 'validate', () ->
    describe 'version', () ->
      it 'should be required', () ->
        # undefined version
        config = {
          name: 'test'
        }
        (-> new crystal config)
          .should.throw "'version' is required."
        
        # null version
        config = {
          name: 'test'
          version: null
        }
        (-> new crystal config)
          .should.throw "'version' is required."
      
      it 'should be a string', () ->
        # object version
        config = {
          name: 'test'
          version: {}
        }
        (-> new crystal config)
          .should.throw "'version' must be of type (string)."
        
        # true version
        config = {
          name: 'test'
          version: true
        }
        (-> new crystal config)
          .should.throw "'version' must be of type (string)."
        
        # false version
        config = {
          name: 'test'
          version: false
        }
        (-> new crystal config)
          .should.throw "'version' must be of type (string)."
      
      it 'should be valid', () ->
        # major version
        config = {
          name: 'test'
          version: '1.0.0'
        }
        (-> new crystal config)
          .should.not.throw "'version' is invalid."
        
        # minor version
        config = {
          name: 'test'
          version: '0.1.0'
        }
        (-> new crystal config)
          .should.not.throw "'version' is invalid."
        
        # patch version
        config = {
          name: 'test'
          version: '0.0.1'
        }
        (-> new crystal config)
          .should.not.throw "'version' is invalid."
        
        # false version
        config = {
          name: 'test'
          version: 'alpha'
        }
        (-> new crystal config)
          .should.throw "'version' is invalid."