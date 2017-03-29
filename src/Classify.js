'use strict';


/**
 * @param {*} object
 * @param {function()=} init
 */
function classify(object, init) {
	for (var key in object) {
		if (typeof object[key] === 'function') {
			object[key] = object[key].bind(this);
		}
	}
	
	if (typeof init !== 'undefined') {
		init.call(object);
	}
}


/**
 * @param {*} object
 * @param {Array<string>} funcList
 * @param {function()=} init
 */
classify.only = function(object, funcList, init) {
	for (var i = 0; i < funcList.length; i++) {
		var key = funcList[i];
		
		if (typeof object[key] === 'function') {
			object[key] = object[key].bind(this);
		}
	}
	
	if (typeof init !== 'undefined') {
		init.call(object);
	}
};


module.exports = classify;