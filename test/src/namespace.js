'use strict';


const Classy = require('../../index');
const assert = require('chai').assert;


suite('Classy', () => {
	test('Namespace registered', () => {
		assert.isObject(Classy);
	});
});