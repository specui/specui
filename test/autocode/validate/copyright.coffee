autocode = require '../../../src/autocode'

describe 'autocode', () ->
  describe 'validate', () ->
    describe 'copyright', () ->
      it 'should be optional', () ->
        (-> new autocode {})
          .should.not.throw "'copyright' is required."
          
      it 'should be a string', () ->
        # object
        config = {
          name: 'test'
          version: '0.0.0'
          copyright: {}
        }
        (-> new autocode config)
          .should.throw "`copyright` must be a `string`, not a `object`."