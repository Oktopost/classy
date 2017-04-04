require('./namespace.js').namespace('Classy', function() { 
	'use strict';
	
	
	/**
	 * @name Classy.classify
	 * 
	 * @param {*} object
	 * @param {function()=} init
	 */
	this.classify = function classify(object, init) {
		for (var key in object) {
			if (typeof object[key] === 'function') {
				object[key] = object[key].bind(object);
			}
		}
		
		if (typeof init !== 'undefined') {
			init.call(object);
		}
		
		return object;
	};
});