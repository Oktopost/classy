'use strict';


/**
 * @template T
 * 
 * @param {T} target
 * @return {T}
 */
module.exports = function Singleton(target) {
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