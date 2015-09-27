autocode = require '../../../src/autocode'

describe 'autocode', () ->
  describe 'validate', () ->
    describe 'name', () ->
      it 'should be optional', () ->
        (-> new autocode {})
          .should.not.throw "'name' is required."
        
      it 'should be a string', () ->
        # object name
        config = {
          name: {}
        }
        (-> new autocode config)
          .should.throw "`name` must be a `string`, not a `object`."