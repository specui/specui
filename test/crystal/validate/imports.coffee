crystal = require '../../../src/crystal'

describe 'crystal', () ->
  describe 'validate', () ->
    describe 'imports', () ->
      it 'should be optional', () ->
        (-> new crystal {})
          .should.not.throw "`imports` is required."
        
      it 'should be a object', () ->
        # object
        config = {
          imports: {
            'crystal/readme': 'latest'
          }
        }
        (-> new crystal config)
          .should.not.throw "`imports` must be a `object`, not a `object`."
        
        # true
        config = {
          imports: true
        }
        (-> new crystal config)
          .should.throw "`imports` must be a `object`, not a `boolean`."
          
        # false
        config = {
          imports: false
        }
        (-> new crystal config)
          .should.throw "`imports` must be a `object`, not a `boolean`."