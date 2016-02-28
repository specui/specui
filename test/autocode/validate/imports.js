import Autocode from '../../../src/autocode'
import Chai from 'chai'
import fs from 'fs-extra'

const expect = Chai.expect

describe('imports', _ => {
  after(done => {
    fs.removeSync('/tmp/autocode-test')
    done()
  })
  
  it('should be an object', done => {
    const config = {
      name: 'Test',
      imports: {}
    }
    
    expect(_ => { new Autocode(config) })
      .to.not.throw('`imports` must be a `object`, not a `object`.')
    
    done()
  })
  
  it('should be an object with additional properties', done => {
    const validConfig = {
      name: 'Test',
      imports: {
        'ctate/readme': '~0.1.0'
      }
    }
    const invalidConfigTrue = {
      name: 'Test',
      imports: {
        'ctate/readme': true
      }
    }
    const invalidConfigFalse = {
      name: 'Test',
      imports: {
        'ctate/readme': false
      }
    }
    
    expect(_ => { new Autocode(validConfig) })
      .to.not.throw('`imports/ctate/readme` must be a `string` or `object`, not a `boolean`.')
    expect(_ => { new Autocode(invalidConfigTrue) })
      .to.throw('`imports/ctate/readme` must be a `string` or `object`, not a `boolean`.')
    expect(_ => { new Autocode(invalidConfigFalse) })
      .to.throw('`imports/ctate/readme` must be a `string` or `object`, not a `boolean`.')
    
    done()
  })
  
  it('should not be required', done => {
    const config = {
      name: 'Test'
    }
    
    expect(_ => { new Autocode(config) })
      .to.not.throw('`imports` is required.')
    
    done()
  })
  
  it('should not be a string', done => {
    const config = {
      name: 'Test',
      imports: 'Test User'
    }
    
    expect(_ => { new Autocode(config) })
      .to.throw('`imports` must be a `object`, not a `string`.')
    
    done()
  })
  
  it('should not be an array', done => {
    const config = {
      name: 'Test',
      imports: []
    }
    
    expect(_ => { new Autocode(config) })
      .to.throw('`imports` must be a `object`, not a `array`.')
    
    done()
  })
  
  it('should validate semver', done => {
    const validConfig = {
      name: 'Test',
      imports: {
        'ctate/readme': '~0.1.0'
      }
    }
    const invalidConfig = {
      name: 'Test',
      imports: {
        'ctate/readme': 'ABC'
      }
    }
    
    new Autocode(validConfig)
    new Autocode(invalidConfig)
    
    done()
  })
})
