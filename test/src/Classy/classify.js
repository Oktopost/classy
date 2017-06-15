const classify = require('../../index').classify;
const assert = require('chai').assert;


suite('classify', () =>
{
	test('Same object returned', () =>
	{
		var obj = {};
		assert.equal(obj, classify(obj));
	});
	
	test('Sanity, Object without functions', () =>
	{
		var obj = { a: 1, b: 2 };
		assert.equal(obj, classify(obj));
	});
	
	test('Sanity, Object with functions', () =>
	{
		var obj = { a: function() {} };
		assert.equal(obj, classify(obj));
	});
	
	test('Functions binned to obj', () =>
	{
		var obj = { a: function() {
			return this;
		} };
		
		classify(obj);
		
		assert.equal(obj, obj.a.call({}));
	});
	
	test('init functions passed, init called', () =>
	{
		var isCalled = false;
		
		classify({}, () => { isCalled = true; });
		
		assert.isTrue(isCalled);
	});
});