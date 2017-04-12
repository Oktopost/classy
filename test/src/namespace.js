'use strict';


const Classy	= require('../../index');
const assert	= require('chai').assert;

const Namespace = require('oktopost-namespace');


suite('Classy', () => {
	test('Namespace registered', () => {
		assert.isObject(Classy);
		assert.notInstanceOf(Classy, Namespace);
	});
});