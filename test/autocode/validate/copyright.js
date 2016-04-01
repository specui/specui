import Autocode from '../../../src/autocode'
import Chai from 'chai'
import { after, describe, it } from 'mocha'
import fs from 'fs-extra'

const expect = Chai.expect

describe('copyright', () => {
	after(done => {
		fs.removeSync('/tmp/autocode-test')
		done()
	})

	it('should be required', done => {
		expect(() => {
			const autocode = new Autocode()
			autocode.hi()
		})
		.to.not.throw('`copyright` is required.')

		done()
	})

	it('should not be an object', done => {
		const config = {
			copyright: {}
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.throw('`copyright` must be a `string`, not a `object`.')

		done()
	})

	it('should be a string', done => {
		const config = {
			copyright: 'Test User'
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.not.throw('`copyright` must be a `string`, not a `string`.')

		done()
	})

	it('should not be an array', done => {
		const config = {
			copyright: []
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.throw('`copyright` must be a `string`, not a `array`.')

		done()
	})
})
