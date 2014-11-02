'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Modoaccount = mongoose.model('Modoaccount'),
	_ = require('lodash');

/**
 * Create a Modoaccount
 */
exports.create = function(req, res) {
	var modoaccount = new Modoaccount(req.body);
	modoaccount.user = req.user;

	modoaccount.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(modoaccount);
		}
	});
};

/**
 * Show the current Modoaccount
 */
exports.read = function(req, res) {
	res.jsonp(req.modoaccount);
};

/**
 * Update a Modoaccount
 */
exports.update = function(req, res) {
	var modoaccount = req.modoaccount ;

	modoaccount = _.extend(modoaccount , req.body);

	modoaccount.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(modoaccount);
		}
	});
};

/**
 * Delete an Modoaccount
 */
exports.delete = function(req, res) {
	var modoaccount = req.modoaccount ;

	modoaccount.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(modoaccount);
		}
	});
};

/**
 * List of Modoaccounts
 */
exports.list = function(req, res) { Modoaccount.find().sort('-created').populate('user', 'displayName').exec(function(err, modoaccounts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(modoaccounts);
		}
	});
};

/**
 * Modoaccount middleware
 */
exports.modoaccountByID = function(req, res, next, id) { Modoaccount.findById(id).populate('user', 'displayName').exec(function(err, modoaccount) {
		if (err) return next(err);
		if (! modoaccount) return next(new Error('Failed to load Modoaccount ' + id));
		req.modoaccount = modoaccount ;
		next();
	});
};

/**
 * Modoaccount authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.modoaccount.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};