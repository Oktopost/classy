namespace('Classy', function(root)
{
	var obj = root.Plankton.obj;
	
	
	/**
	 * @param {*} target
	 * @param {*} parent
	 * @param {boolean=true} withStatic
	 */
	function inherit(target, parent, withStatic)
	{
		target.prototype = Object.create(parent.prototype);
		target.prototype.constructor = target;
		
		if (withStatic !== false)
			obj.mix(target, parent);
	}
	
	
	this.inherit = inherit;
});