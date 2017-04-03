require('./namespace.js').namespace('Classy', () => { 
	'use strict';
	
	
	/**
	 * @class Classy.Singleton
	 * @template T
	 * 
	 * @param {T} target
	 * @return {{instance: function(): T}}
	 */
	this.Singleton = function Singleton(target) {
		target.__instance__ = null;
		
		//noinspection JSUndefinedPropertyAssignment
		target.instance = function() {
			
			if (target.__instance__ === null) {	
				//noinspection JSValidateTypes
				target.__instance__ = new target();
			}
			
			return target.__instance__;
		};
		
		return target;
	};
});