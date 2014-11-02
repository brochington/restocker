'use strict';

module.exports = function(app){
	var users = require('../../app/controllers/users'),
		staples = require('../../app/controllers/staples');

	app.route('/staples/getData')
		.get(staples.getData);
};