const Enum = require('../../index').Enum;
const assert = require('chai').assert;


suite('Enum', () => {
	test('Returns same object', () => {
		var obj = {};
		
		assert.equal(obj, Enum(obj));
	});
	
	suite('getAllKeys', () => {
		test('Empty object returns empty array', () => {
			var obj = {};
			assert.deepEqual([], Enum(obj).getAllKeys());
		});
		
		test('Object returns keys', () => {
			var obj = {
				a: 1,
				b: 2
			};
			
			assert.deepEqual(['a', 'b'], Enum(obj).getAllKeys());
		});
		
		test('Instance Object returns only owned properties', () => {
			var type = function() {};
			type.prototype.prop = 123;
			
			var obj = new type();
			obj.a = 2;
			
			assert.deepEqual(['a'], Enum(obj).getAllKeys());
		});
		
		test('Primitive values only returned', () => {
			var obj = {
				a: 1,
				b: {}
			};
			
			assert.deepEqual(['a'], Enum(obj).getAllKeys());
		});
	});
	
	suite('getAllValues', () => {
		test('Empty object returns empty array', () => {
			var obj = {};
			assert.deepEqual([], Enum(obj).getAllValues());
		});
		
		test('Object returns values', () => {
			var obj = {
				a: 1,
				b: '2'
			};
			
			assert.deepEqual([1, '2'], Enum(obj).getAllValues());
		});
		
		test('Instance Object returns only owned properties', () => {
			var type = function() {};
			type.prototype.prop = 123;
			
			var obj = new type();
			obj.a = 2;
			
			assert.deepEqual([2], Enum(obj).getAllValues());
		});
		
		test('Primitive values only returned', () => {
			var obj = {
				a: 1,
				b: {}
			};
			
			assert.deepEqual([1], Enum(obj).getAllValues());
		});
	});
	
	suite('hasKey', () => {
		test('Key not found, return false', () => {
			var obj = {};
			assert.isFalse(Enum(obj).hasKey('a'));
		});
		
		test('Key found, return true', () => {
			var obj = {
				a: 1,
				b: '2'
			};
			
			assert.isTrue(Enum(obj).hasKey('a'));
		});
		
		test('Not owned property key returns false', () => {
			var type = function() {};
			type.prototype.prop = 123;
			
			assert.isFalse(Enum(new type).hasKey('prop'));
		});
		
		test('None Primitive values return false', () => {
			var obj = {
				a: 1,
				b: {}
			};
			
			assert.isFalse(Enum(obj).hasKey('b'));
		});
	});
	
	suite('hasValue', () => {
		test('Value not found, return false', () => {
			var obj = {};
			assert.isFalse(Enum(obj).hasValue('a'));
		});
		
		test('Value found, return true', () => {
			var obj = {
				a: 1,
				b: '2'
			};
			
			assert.isTrue(Enum(obj).hasValue(1));
			assert.isTrue(Enum(obj).hasValue('2'));
		});
		
		test('Not owned property value returns false', () => {
			var type = function() {};
			type.prototype.prop = 123;
			
			assert.isFalse(Enum(new type).hasValue('123'));
		});
		
		test('None Primitive values return false', () => {
			var data = {};
			var obj = {
				b: data
			};
			
			assert.isFalse(Enum(obj).hasValue(data));
		});
	});
	
	suite('count', () => {
		test('Empty object return zero', () => {
			var obj = {};
			assert.equal(0, Enum(obj).count());
		});
		
		test('Not empty object, count is correct', () => {
			var obj = {
				a: 1,
				b: '2'
			};
			
			assert.equal(2, Enum(obj).count());
		});
		
		test('Only owned properties counted', () => {
			var type = function() {};
			type.prototype.prop = 123;
			
			assert.equal(0, Enum(new type).count());
		});
		
		test('Only primitive counted', () => {
			var obj = { b: {}, a: 1 };
			assert.equal(1, Enum(obj).count());
		});
	});
	
	suite('forEach', () => {
		test('Empty object not call iterator', () => {
			var obj = {};
			Enum(obj).forEach(() => {
				assert.fail('Should not be called');
			});
		});
		
		test('Not empty object will call the callback function', () => {
			var obj = {
				a: 1,
				b: '2'
			};
			
			var isCalled = false;
			
			Enum(obj).forEach(() => { isCalled = true;	});
			
			assert.isTrue(isCalled);
		});
		
		test('Callback called for each pair', () => {
			var obj = {
				a: 1,
				b: '2'
			};
			
			var data = [];
			
			Enum(obj).forEach((key, value) => { data.push([key, value]); });
			
			assert.deepEqual([['a', 1], ['b', '2']], data);
		});
		
		test('Break loop if callback return false', () => {
			var obj = {
				a: 1,
				b: '2'
			};
			
			var data = [];
			
			Enum(obj).forEach((key, value) => { data.push([key, value]); return false; });
			
			assert.deepEqual([['a', 1]], data);
		});
		
		test('Not owned properties - not passed', () => {
			var type = function() {};
			type.prototype.prop = 123;
			
			Enum(new type).forEach(() => {
				assert.fail('Should not be called');
			});
		});
		
		test('Not primitive values not passed', () => {
			var obj = { b: {}, a: new Number(1) };
			Enum(obj).forEach(() => {
				assert.fail('Should not be called');
			});
		});
	});
});