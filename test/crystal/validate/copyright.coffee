crystal = require '../../../src/crystal'

describe 'crystal', () ->
  describe 'validate', () ->
    describe 'copyright', () ->
      it 'should be optional', () ->
        (-> new crystal {})
          .should.not.throw "'copyright' is required."
          
      it 'should be a string', () ->
        # object
        config = {
          name: 'test'
          version: '0.0.0'
          copyright: {}
        }
        (-> new crystal config)
          .should.throw "`copyright` must be a `string`, not a `object`."