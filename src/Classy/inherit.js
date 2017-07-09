namespace('Classy', function()
{
	/**
	 * @param {*} target
	 * @param {*} parent
	 */
	function inherit(target, parent)
	{
		target.prototype = Object.create(parent.prototype);
		target.prototype.constructor = target;
	}
	
	
	this.inherit = inherit;
});