'use strict';

//Setting up route
angular.module('subscriptions').config(['$stateProvider',
	function($stateProvider) {
		// Subscriptions state routing
		$stateProvider.
		// state('listSubscriptions', {
		// 	url: '/subscriptions',
		// 	templateUrl: 'modules/subscriptions/views/list-subscriptions.client.view.html'
		// }).
		// state('createSubscription', {
		// 	url: '/subscriptions/create',
		// 	templateUrl: 'modules/subscriptions/views/create-subscription.client.view.html'
		// }).
		// state('viewSubscription', {
		// 	url: '/subscriptions/:subscriptionId',
		// 	templateUrl: 'modules/subscriptions/views/view-subscription.client.view.html'
		// }).
		state('yourSubscriptions', {
			url: '/subscriptions/yourSubscriptions',
			templateUrl: 'modules/subscriptions/views/home-subscription.client.view.html'
		}).
		state('editSubscription', {
			url: '/subscriptions/:subscriptionId/edit',
			templateUrl: 'modules/subscriptions/views/edit-subscription.client.view.html'
		});
	}
]);