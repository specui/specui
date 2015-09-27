autocode = require '../../../src/autocode'

describe 'autocode', () ->
  describe 'validate', () ->
    describe 'imports', () ->
      it 'should be optional', () ->
        (-> new autocode {})
          .should.not.throw "`imports` is required."
        
      it 'should be a object', () ->
        # object
        config = {
          imports: {
            'autocode/readme': 'latest'
          }
        }
        (-> new autocode config)
          .should.not.throw "`imports` must be a `object`, not a `object`."
        
        # true
        config = {
          imports: true
        }
        (-> new autocode config)
          .should.throw "`imports` must be a `object`, not a `boolean`."
          
        # false
        config = {
          imports: false
        }
        (-> new autocode config)
          .should.throw "`imports` must be a `object`, not a `boolean`."