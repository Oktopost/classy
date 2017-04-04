require('./namespace.js').namespace('Classy', function() { 
	'use strict';
	
	
	/**
	 * @class Classy.Singleton
	 * @template T
	 * 
	 * @param {T} target
	 * @return {{instance: function(): T}}
	 */
	this.Singleton = function Singleton(target) {
		
		var container = function() {
			throw 'Can not create instance of singleton';
		};
		
		container.prototype = target.prototype;
		
		container.__instance__ = null;
		container.instance = function() {
			if (container.__instance__ === null) {
				//noinspection JSValidateTypes
				container.__instance__ = new target();
			}
			
			return container.__instance__;
		};
		
		return container;
	};
});