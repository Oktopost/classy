'use strict';


const Namespace = require('oktopost-namespace');


var container = {}; 
var Classy = new Namespace(container);


container.Classy = Classy;


module.exports = {
	Classy: Classy,
	namespace: Classy.namespace.bind(Classy)
};