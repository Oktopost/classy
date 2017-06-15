const Singleton = require('../../index').Singleton;
const assert = require('chai').assert;


suite('Singleton', () => {
	test('Object registered', () => {
		assert.isFunction(Singleton); 
	});
	
	test('New object returned', () => {
		var cls = function() {};
		
		assert.notEqual(cls, Singleton(cls));
	});
	
	test('Function returned', () => {
		assert.isFunction(Singleton(function() {}));
	});
	
	test('Instance function will return object of the same type as new returned function', () => {
		var cls = function() {};
		var newCls = Singleton(cls);
		
		assert.instanceOf(newCls.instance(), newCls);
	});
	
	test('Instance function will return object of the original type', () => {
		var cls = function() {};
		
		assert.instanceOf(Singleton(cls).instance(), cls);
	});
	
	test('Instance function will return same object each time', () => {
		var container = Singleton(function() {});
		
		assert.equal(container.instance(), container.instance());
	});
	
	test('Error thrown if new called for singleton container', () => {
		assert.throws(
			() => { new (Singleton(function() {})); }
		);
	});
});