'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	User = mongoose.model('User'),
	Subscription = mongoose.model('Subscription'),
	_ = require('lodash');

/**
 * Create a Subscription
 */
exports.create = function(req, res) {
	var subscription = new Subscription(req.body);
	subscription.user = req.user;

	subscription.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(subscription);
		}
	});
};

/**
 * Show the current Subscription
 */
exports.read = function(req, res) {
	res.jsonp(req.subscription);
};

/**
 * Update a Subscription
 */
exports.update = function(req, res) {
	var subscription = req.subscription ;

	subscription = _.extend(subscription , req.body);

	subscription.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(subscription);
		}
	});
};

/**
 * Delete an Subscription
 */
exports.delete = function(req, res) {
	var subscription = req.subscription ;

	subscription.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(subscription);
		}
	});
};

/**
 * List of Subscriptions
 */
exports.list = function(req, res) { Subscription.find().sort('-created').populate('user', 'displayName').exec(function(err, subscriptions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(subscriptions);
		}
	});
};

/**
 * Subscription middleware
 */
exports.subscriptionByID = function(req, res, next, id) { Subscription.findById(id).populate('user', 'displayName').exec(function(err, subscription) {
		if (err) return next(err);
		if (! subscription) return next(new Error('Failed to load Subscription ' + id));
		req.subscription = subscription ;
		next();
	});
};

/**
 * Subscription authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.subscription.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.createSubscription = function(req, res){
	console.log('reached it man.');
	console.log('local user: ', req.user._id);
	console.log(req.body);
	User.findById(req.user._id, function(err, user){
		console.log('user: ', user);
		user.subscriptionProducts.push({
			itemText: req.body.property1.text,
			itemLink: req.body.property1.href,
			price: req.body.property2,
			imgSrc: req.body.property3.src,
			imgHref: req.body.property3.href,
			imgAlt: req.body.property3.alt,
			taskID: Math.floor((Math.random() * 10000000000000000) + 1),
			deliverySchedule: req.body.deliverySchedule,
			taskHasStarted: false

		});

		user.save();

	});
};