'use strict';


const Namespace = require('oktopost-namespace');


var Classy = new Namespace();


module.exports = {
	Classy: Classy.get('Classy'),
	namespace: Classy.getCreator()
};