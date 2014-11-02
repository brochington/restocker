'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var subscriptions = require('../../app/controllers/subscriptions');

	// Subscriptions Routes
	app.route('/subscriptions')
		.get(subscriptions.list)
		.post(users.requiresLogin, subscriptions.create);

	app.route('/subscriptions/createSubscription')
		.post(subscriptions.createSubscription);

	app.route('/subscriptions/:subscriptionId')
		.get(subscriptions.read)
		.put(users.requiresLogin, subscriptions.hasAuthorization, subscriptions.update)
		.delete(users.requiresLogin, subscriptions.hasAuthorization, subscriptions.delete);

	// Finish by binding the Subscription middleware
	app.param('subscriptionId', subscriptions.subscriptionByID);
};