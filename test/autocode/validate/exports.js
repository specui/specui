import Autocode from '../../../src/autocode'
import Chai from 'chai'
import { after, describe, it } from 'mocha'
import fs from 'fs-extra'

const expect = Chai.expect

describe('exports', () => {
	after(done => {
		fs.removeSync('/tmp/autocode-test')
		done()
	})

	it('should be an object', done => {
		const config = {
			name: 'Test',
			exports: {}
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.not.throw('`exports` must be a `object`, not a `object`.')

		done()
	})

	it('should not be required', done => {
		const config = {
			name: 'Test'
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.not.throw('`exports` is required.')

		done()
	})

	it('should not be a string', done => {
		const config = {
			name: 'Test',
			exports: 'Test User'
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.throw('`exports` must be a `object`, not a `string`.')

		done()
	})

	it('should not be an array', done => {
		const config = {
			name: 'Test',
			exports: []
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.throw('`exports` must be a `object`, not a `array`.')

		done()
	})
})
