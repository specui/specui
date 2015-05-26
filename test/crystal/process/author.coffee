crystal = require '../../../src/code/crystal'

describe 'crystal', () ->
  describe 'process', () ->
    describe 'author', () ->
      it 'should be exactly the same', () ->
        config = {
          name: 'test'
          version: '0.1.0'
          author: {}
        }
        
        config.author.name = 'Test User'
        #new crystal().process(config)
        #  .author.should.be.exactly(config.author)
        
        config.author.email = 'test@domain.com'
        #new crystal().process(config)
        #  .author.should.be.exactly(config.author)
        
        config.author.url = 'http://domain.com'
        #new crystal().process(config)
        #  .author.should.be.exactly(config.author)