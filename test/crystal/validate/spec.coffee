crystal = require '../../../src/crystal'

describe 'crystal', () ->
  describe 'validate', () ->
    describe 'spec', () ->
      it 'should be optional', () ->
        config = {
          name: 'test'
          version: '1.0.0'
        }
        (-> new crystal config)
          .should.not.throw 'Spec is required.'