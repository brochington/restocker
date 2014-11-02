'use strict';

//Subscriptions service used to communicate Subscriptions REST endpoints
angular.module('subscriptions').factory('Subscriptions', ['$resource',
	function($resource) {
		return $resource('subscriptions/:subscriptionId', { subscriptionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);