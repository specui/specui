crystal = require '../../../src/crystal'

describe 'crystal', () ->
  describe 'validate', () ->
    describe 'name', () ->
      it 'should be required', () ->
        # undefined name
        config = {
          version: '0.1.0'
        }
        (-> new crystal config)
          .should.throw "'name' is required."
        
      it 'should be a string', () ->
        # object name
        config = {
          name: {}
        }
        (-> new crystal config)
          .should.throw "'name' must be of type (string)."