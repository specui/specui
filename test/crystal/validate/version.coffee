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
          .should.not.throw "`version` is required."
        
        # null version
        config = {
          name: 'test'
          version: null
        }
        (-> new crystal config)
          .should.not.throw "`version` is required."
      
      it 'should be a number or string', () ->
        # number version
        config = {
          name: 'test'
          version: 1.0
        }
        (-> new crystal config)
          .should.not.throw "`version` must be a `number` or `string`, not a `number`."
        
        # string version
        config = {
          name: 'test'
          version: '1.0.0'
        }
        (-> new crystal config)
          .should.not.throw "`version` must be a `number` or `string`, not a `string`."
          
        # object version
        config = {
          name: 'test'
          version: {}
        }
        (-> new crystal config)
          .should.throw "`version` must be a `number` or `string`, not a `object`."
        
        # true version
        config = {
          name: 'test'
          version: true
        }
        (-> new crystal config)
          .should.throw "`version` must be a `number` or `string`, not a `boolean`."
        
        # false version
        config = {
          name: 'test'
          version: false
        }
        (-> new crystal config)
          .should.throw "`version` must be a `number` or `string`, not a `boolean`."