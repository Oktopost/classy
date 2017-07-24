const inherit = require('../../index').Classy.inherit;
const assert = require('chai').assert;


suite('inherit', () =>
{
	test('instanceOf works', () =>
	{
		function A() {}
		function B() {}
		
		inherit(A, B);
		
		assert.instanceOf(new A(), A);
		assert.instanceOf(new A(), B);
		
		assert.notInstanceOf(new B(), A);
		assert.instanceOf(new B(), B);
	});
	
	test('Prototype cloned', () =>
	{
		function A() {}
		function B() {}
		
		B.prototype.a = function() {};
		
		inherit(A, B);
		
		assert.isDefined((new A()).a);
	});
	
	test('Static methods cloned', () => 
	{
		function A() {}
		function B() {}
		
		B.a = function () {};
		
		inherit(A, B);
		
		assert.strictEqual(A.a, B.a);
	});
	
	test('Static methods not cloned when requested', () => 
	{
		function A() {}
		function B() {}
		
		B.a = function () {};
		
		inherit(A, B, false);
		
		assert.notEqual(A.a, B.a);
	});
});