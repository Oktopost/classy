'use strict';


var classify = require('./Classify');

var is		= require('oktopost-plankton').is;
var array	= require('oktopost-plankton').array;


/**
 * @constructor
 * @param {{}=} root
 */
function Namespace(root) {
	this._root = root || global;
}


/**
 * @param {{}} [namespace]
 * @param {Array<string>} [path]
 * @return {{}}
 * @private
 */
Namespace.prototype._create = function(namespace, path) {
	array.forEach(path, function(name) {
		namespace[name] = {};
		namespace = namespace[name]; 
	});
	
	return namespace;
};

/**
 * @param {string} [namespace]
 * @param {function(Object, Array<string>)} [onUndefined]
 * @return {{}}
 */
Namespace.prototype._walk = function(namespace, onUndefined) {
	var name;
	var path	= namespace.split('.');
	var current = this._root;
	
	for (var i = 0; i < path.length; i++) {
		name = path[i];

		if (is.undefined(current[name])) {
			return onUndefined(current, path.splice(i));
		}

		current = current[name];
	}
	
	return current;
};


/**
 * @param {string} [namespace]
 * @return {{}}
 */
Namespace.prototype.get = function(namespace) {
	if (namespace === '') {
		return this._root;
	}
	
	return this._walk(namespace, this._create);
};

/**
 * @param {string} [namespace]
 * @param {function()} [scope]
 */
Namespace.prototype.namespace = function(namespace, scope) {
	scope.call(this.get(namespace));
};

/**
 * @param {string} namespace
 * @return {boolean}
 */
Namespace.prototype.isSet = function (namespace) {
	if (namespace === '') {
		return true;
	}
	
	return is.object(this._walk(namespace, function() { return false; }));
};


/**
 * @param {string} [name]
 * @param {{}=} [root]
 * @static
 */
Namespace.register = function(name, root) {
	root = root || global;
	root[name] = new Namespace(root);
};


module.exports = Namespace;