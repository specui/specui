import Autocode from '../../../src/autocode'
import Chai from 'chai'
import { after, describe, it } from 'mocha'
import fs from 'fs-extra'

const expect = Chai.expect

describe('imports', () => {
	after(done => {
		fs.removeSync('/tmp/autocode-test')
		done()
	})

	it('should be an object', done => {
		const config = {
			name: 'Test',
			imports: {}
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
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

		expect(() => {
			const autocode = new Autocode(validConfig)
			autocode.hi()
		})
		.to.not.throw('`imports/ctate/readme` must be a `string` or `object`, not a `boolean`.')

		expect(() => {
			const autocode = new Autocode(invalidConfigTrue)
			autocode.hi()
		})
		.to.throw('`imports/ctate/readme` must be a `string` or `object`, not a `boolean`.')

		expect(() => {
			const autocode = new Autocode(invalidConfigFalse)
			autocode.hi()
		})
		.to.throw('`imports/ctate/readme` must be a `string` or `object`, not a `boolean`.')

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
		.to.not.throw('`imports` is required.')

		done()
	})

	it('should not be a string', done => {
		const config = {
			name: 'Test',
			imports: 'Test User'
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
		.to.throw('`imports` must be a `object`, not a `string`.')

		done()
	})

	it('should not be an array', done => {
		const config = {
			name: 'Test',
			imports: []
		}

		expect(() => {
			const autocode = new Autocode(config)
			autocode.hi()
		})
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

		const autocode1 = new Autocode(validConfig)
		autocode1.hi()

		const autocode2 = new Autocode(invalidConfig)
		autocode2.hi()

		done()
	})
})
