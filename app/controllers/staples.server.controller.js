'use strict';

var mongoose = require('mongoose'),
	_ = require('lodash'),
	staples = require('../../app/libraries/staples'),
	User = mongoose.model('User');

exports.getData = function(req, res){
	console.log('reached getPartNumberList');
	staples.getData(function(info){
		console.log('hitting callback...');
		res.status(200).send(info);
	});

};