import Autocode from '../../../src/autocode'
import Chai from 'chai'
import fs from 'fs-extra'

const expect = Chai.expect

describe('description', _ => {
  after(done => {
    fs.removeSync('/tmp/autocode-test')
    done()
  })
  
  it('should not be required', done => {
    expect(_ => { new Autocode({}) })
      .to.not.throw('`description` is required.')
    
    done()
  })
  
  it('should not be an object', done => {
    const config = {
      name: 'Test',
      description: {}
    }
    
    expect(_ => { new Autocode(config) })
      .to.throw('`description` must be a `string`, not a `object`.')
    
    done()
  })
  
  it('should be a string', done => {
    const config = {
      name: 'Test',
      description: 'Test User'
    }
    
    expect(_ => { new Autocode(config) })
      .to.not.throw('`description` must be a `string`, not a `string`.')
    
    done()
  })
  
  it('should not be an array', done => {
    const config = {
      name: 'Test',
      description: []
    }
    
    expect(_ => { new Autocode(config) })
      .to.throw('`description` must be a `string`, not a `array`.')
    
    done()
  })
})
