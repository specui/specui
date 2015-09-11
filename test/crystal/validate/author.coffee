crystal = require '../../../src/crystal'

describe 'crystal', () ->
  describe 'validate', () ->
    describe 'author', () ->
      it 'should be optional', () ->
        (-> new crystal {})
          .should.not.throw "'author' is required."
      
      it 'should be a object', () ->
        # object
        config = {
          author: {
            name: 'Test'
            email: 'test@example.org'
            url: 'http://example.org'
          }
        }
        (-> new crystal config)
          .should.not.throw "`author` must be a `object`, not a `object`."
        
        # true
        config = {
          author: true
        }
        (-> new crystal config)
          .should.throw "`author` must be a `object`, not a `boolean`."
        
        # false
        config = {
          author: false
        }
        (-> new crystal config)
          .should.throw "`author` must be a `object`, not a `boolean`."