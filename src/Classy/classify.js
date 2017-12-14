namespace('Classy', function(root)
{
	function getProto(target)
	{
		if (typeof Object.getPrototypeOf === 'function')
			return Object.getPrototypeOf(target);
		
		if (typeof target.constructor !== 'undefined' && target.constructor.prototype !== 'undefined')
			return target.constructor.prototype;
		
		if (typeof target.__proto__ !== 'undefined')
			return target.__proto__;
		
		return {};
	}
	
	
	/**
	 * @name Classy.classify
	 * 
	 * @param {*} object
	 * @param {function()=} init
	 */
	this.classify = function classify(object, init)
	{
		var proto = getProto(object);
		
		for (var key in proto)
		{
			if (typeof proto[key] === 'function')
			{
				object[key] = proto[key].bind(object);
			}
		}
		
		if (typeof init !== 'undefined')
		{
			init.call(object);
		}
		
		return object;
	};
});