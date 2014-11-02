'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	_ = require('lodash'),
	User = mongoose.model('User'),
	modo = require('../../app/libraries/modo'),
	Modoaccount = mongoose.model('Modoaccount');


exports.getList = function(req, res){
	console.log('reached getList...');
};

exports.addCard = function(req, res){
	console.log('reached addCard');
	console.log('user: ', req.user);
	console.log('body:', req.body);
	console.log('state: ', req.body.state.abbr);

	var params = {
		consumer_key: modo.apiKey,
		access_token: modo.token,
		account_id: req.user.accountID,
		card_number: req.body.cardNumber,
		expiry: req.body.expiry,
		card_security: req.body.cardSecurity,
		zip_code: req.body.zipcode.replace(/-/g, ''),
		card_address: req.body.address + ' ' + req.body.city
	};

	// console.log('params: ', params);

	modo.postRequest('card', 'add', params, function (err, resp){
		if(err){console.log(err);}

		resp = JSON.parse(resp);
		// console.log('user id: ', req.user._id);
		User.findById(req.user._id, function(err, user){
			// console.log('new user: ', user);

			// var newUser = user.toObject();

			// console.log(user.modoAccounts);

			// console.log(user.modoAccounts);
			// user.modoAccounts.push('hello');

			user.save(function(err, something){
				if(err){console.log(err);}
			});
		

			user.modoAccounts.push({
				card_number: req.body.cardNumber,
				expiry: req.body.expiry,
				card_security: req.body.cardSecurity,
				zip_code: req.body.zipcode.replace(/-/g, ''),
				card_address: req.body.address + ' ' + req.body.city
			});

			user.save(function(){
				console.log('saved, I think.');
			});
		});
		// var accounts = user.toObject();

		// accounts.push({
		// 	card_number: req.body.cardNumber,
		// 	expiry: req.body.expiry,
		// 	card_security: req.body.cardSecurity,
		// 	zip_code: req.body.zipcode.replace(/-/g, ''),
		// 	card_address: req.body.address + ' ' + req.body.city + req.body.state
		// });

//		user.save();

		console.log('resp', resp);

		res.status(200).jsonp(resp);
	});
};

exports.testModoRoute = function(req, res){
	console.log('modo');

	var params = {
		'credentials': (new Buffer('c98de17fddf04304d1964e9166479037:6c35adce2d5f1d4a9f6a4de381d05f848bb8f823e069b330058ebc025b3c9acb').toString('base64'))
	};

	console.log('params: ',params);

	modo.postRequest('token', null, params, function (err, response){
		if(err){console.log(err);}
		res.status(200).send(response);
	});
};