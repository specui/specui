import Autocode from '../../../src/autocode'
import Chai from 'chai'
import { after, describe, it } from 'mocha'
import fs from 'fs-extra'

const expect = Chai.expect

describe('description', () => {
	after(done => {
		fs.removeSync('/tmp/autocode-test')
		done()
	})

	it('should not be required', done => {
		expect(() => {
			const autocode = new Autocode()
			autocode.hi()
		})
		.to.not.throw('`description` is required.')

		done()
	})

	it('should not be an object', done => {
		const config = {
			name: 'Test',
			description: {}
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.throw('`description` must be a `string`, not a `object`.')

		done()
	})

	it('should be a string', done => {
		const config = {
			name: 'Test',
			description: 'Test User'
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.not.throw('`description` must be a `string`, not a `string`.')

		done()
	})

	it('should not be an array', done => {
		const config = {
			name: 'Test',
			description: []
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.throw('`description` must be a `string`, not a `array`.')

		done()
	})
})
