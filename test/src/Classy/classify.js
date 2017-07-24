const classify = require('../../index').Classy.classify;
const assert = require('chai').assert;


var obj = require('../../index').Plankton.obj;


suite('classify', () =>
{
	test('Same object returned', () =>
	{
		var obj = {};
		assert.equal(obj, classify(obj));
	});
	
	test('Sanity, Object without functions', () =>
	{
		function A() {}
		A.prototype.a = function () { return '123'; };
		var obj = new A();
		
		assert.equal(obj, classify(obj));
	});
	
	test('Sanity, Object with functions', () =>
	{
		function A() {}
		A.prototype.a = '123';
		var obj = new A();
		
		assert.equal(obj, classify(obj));
	});
	
	
	test('Functions binned to obj', () =>
	{
		function A() {}
		
		A.prototype.a = function () { return this; };
		
		var obj = new A();
		
		classify(obj);
		
		assert.equal(obj, obj.a.call({}));
	});
	
	test('Non prototype functions are not binded', () =>
	{
		function A() {}
		
		var obj = new A();
		obj.a = function () { return this; };
		
		classify(obj);
		
		assert.notEqual(obj, obj.a.call({}));
	});
	
	
	test('init functions passed, init called', () =>
	{
		var isCalled = false;
		
		classify({}, () => { isCalled = true; });
		
		assert.isTrue(isCalled);
	});
	
	
	suite('Prototype detection', () => 
	{
		function callClassify(target)
		{
			var original = Object.getPrototypeOf;
			delete Object.getPrototypeOf;
			
			try
			{
				return classify(target);
			}
			finally 
			{
				Object.getPrototypeOf = original;
			}
		}
		
		
		test('getPrototypeOf not set __proto__ used', () => 
		{
			function A() {}
			A.prototype.a = function () { return this; };
			var obj = new A();
			
			callClassify(obj);
				
			assert.equal(obj, obj.a.call({}));
		});
		
		test('getPrototypeOf and constructor not set, __proto__ used', () => 
		{
			function A() {}
			A.prototype.a = function () { return this; };
			var obj = new A();
			
			obj.constructor = undefined;
			
			callClassify(obj);
				
			assert.equal(obj, obj.a.call({}));
		});
		
		test('getPrototypeOf and constructor.prototype not set, __proto__ used', () => 
		{
			function A() {}
			A.prototype.a = function () { return this; };
			var obj = new A();
			
			delete obj.constructor.prototype;
			
			callClassify(obj);
				
			assert.equal(obj, obj.a.call({}));
		});
		
		test('Sanity - getPrototypeOf, constructor.prototype and __proto__ not set', () => 
		{
			function A() {}
			A.prototype.a = function () { return this; };
			var obj = new A();
			
			Object.setPrototypeOf(obj, null);
			
			assert.equal(obj, callClassify(obj));
		});
	});
});