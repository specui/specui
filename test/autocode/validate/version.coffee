autocode = require '../../../src/autocode'

describe 'autocode', () ->
  describe 'validate', () ->
    describe 'version', () ->
      it 'should be required', () ->
        # undefined version
        config = {
          name: 'test'
        }
        (-> new autocode config)
          .should.not.throw "`version` is required."
        
        # null version
        config = {
          name: 'test'
          version: null
        }
        (-> new autocode config)
          .should.not.throw "`version` is required."
      
      it 'should be a number or string', () ->
        # number version
        config = {
          name: 'test'
          version: 1.0
        }
        (-> new autocode config)
          .should.not.throw "`version` must be a `number` or `string`, not a `number`."
        
        # string version
        config = {
          name: 'test'
          version: '1.0.0'
        }
        (-> new autocode config)
          .should.not.throw "`version` must be a `number` or `string`, not a `string`."
          
        # object version
        config = {
          name: 'test'
          version: {}
        }
        (-> new autocode config)
          .should.throw "`version` must be a `number` or `string`, not a `object`."
        
        # true version
        config = {
          name: 'test'
          version: true
        }
        (-> new autocode config)
          .should.throw "`version` must be a `number` or `string`, not a `boolean`."
        
        # false version
        config = {
          name: 'test'
          version: false
        }
        (-> new autocode config)
          .should.throw "`version` must be a `number` or `string`, not a `boolean`."