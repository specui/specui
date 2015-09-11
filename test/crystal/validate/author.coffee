crystal = require '../../../src/crystal'

describe 'crystal', () ->
  describe 'validate', () ->
    describe 'author', () ->
      it 'should be optional', () ->
        (-> new crystal {})
          .should.not.throw "'author' is required."