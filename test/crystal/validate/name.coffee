crystal = require '../../../src/crystal'

describe 'crystal', () ->
  describe 'validate', () ->
    describe 'name', () ->
      it 'should be optional', () ->
        (-> new crystal {})
          .should.not.throw "'name' is required."
        
      it 'should be a string', () ->
        # object name
        config = {
          name: {}
        }
        (-> new crystal config)
          .should.throw "`name` must be a `string`, not a `object`."