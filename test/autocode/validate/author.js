import Autocode from '../../../src/autocode'
import Chai from 'chai'
import fs from 'fs-extra'

const expect = Chai.expect

describe('author', _ => {
  after(done => {
    fs.removeSync('/tmp/autocode-test')
    done()
  })
  
  it('should be optional', done => {
    expect(_ => { new Autocode() })
      .to.not.throw('`author` is required.')
    
    done()
  })
  
  it('should be available as a global', done => {
    const cwd = `/tmp/autocode-test/${Math.random()}`
    
    const config = {
      name: 'Test',
      author: {
        name: 'Test User',
        email: 'test.user@example.org',
        url: 'https://example.org'
      },
      imports: {
        'ctate/handlebars': 'latest'
      },
      exports: {
        AuthorGenerator: {
          engine: 'handlebars.HandlebarsEngine',
          filename: 'AUTHOR.txt',
          template: '# {{{author.name}}}\n\nEmail: {{{author.email}}}\n\nURL: {{{author.url}}}',
          type: 'generator'
        }
      },
      outputs: [{
        generator: 'AuthorGenerator',
        spec: {
          author: '$author'
        }
      }],
      path: cwd
    }
    
    new Autocode(config)
      .update()
      .save()
      .generate()
    
    expect(fs.readFileSync(`${cwd}/AUTHOR.txt`, 'utf-8'))
      .to.equal('# Test User\n\nEmail: test.user@example.org\n\nURL: https://example.org')
    
    done()
  })
  
  it('should be an object containing a name, email and url', done => {
    let autocode = new Autocode({
      name: 'Test',
      author: {
        name: 'Test User',
        email: 'test.user@example.org',
        url: 'https://example.org'
      }
    })
    
    expect(autocode.config)
      .to.be.an('object')
      .that.deep.equals({
        name: 'Test',
        author: {
          name: 'Test User',
          email: 'test.user@example.org',
          url: 'https://example.org'
        },
        host: 'github.com'
      })
    
    done()
  })
  
  it('should be an object', done => {
    const config = {
      author: {}
    }
    
    expect(_ => { new Autocode(config) })
      .to.not.throw('`author` must be a `object`, not a `object`.')
    
    done()
  })
  
  it('should not contain other keys', done => {
    const config = {
      author: {
        someOtherKey: 'Some Other Key Value'
      }
    }
    
    expect(_ => { new Autocode(config) })
      .to.not.throw('`author` must be a `object`, not a `object`.')
    
    done()
  })
  
  it('should not be a boolean', done => {
    const trueConfig = {
      author: true
    }
    const falseConfig = {
      author: true
    }
    
    expect(_ => { new Autocode(trueConfig) })
      .to.throw('`author` must be a `object`, not a `boolean`.')
    expect(_ => { new Autocode(falseConfig) })
      .to.throw('`author` must be a `object`, not a `boolean`.')
    
    done()
  })
  
  it('should not be a string', done => {
    const config = {
      author: 'Test User'
    }
    
    expect(_ => { new Autocode(config) })
      .to.throw('`author` must be a `object`, not a `string`.')
    
    done()
  })
  
  it('should not be an array', done => {
    const config = {
      author: []
    }
    
    expect(_ => { new Autocode(config) })
      .to.throw('`author` must be a `object`, not a `array`.')
    
    done()
  })
})
