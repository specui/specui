autocode = require '../../../src/autocode'

describe 'autocode', () ->
  describe 'validate', () ->
    describe 'author', () ->
      it 'should be optional', () ->
        (-> new autocode {})
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
        (-> new autocode config)
          .should.not.throw "`author` must be a `object`, not a `object`."
        
        # true
        config = {
          author: true
        }
        (-> new autocode config)
          .should.throw "`author` must be a `object`, not a `boolean`."
        
        # false
        config = {
          author: false
        }
        (-> new autocode config)
          .should.throw "`author` must be a `object`, not a `boolean`."