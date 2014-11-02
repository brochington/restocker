'use strict';

//Modoaccounts service used to communicate Modoaccounts REST endpoints
angular.module('modoaccounts').factory('Modoaccounts', ['$resource',
	function($resource) {
		return $resource('modoaccounts/:modoaccountResource', { 
			modoaccountResource: '@_id',
		}, {
			update: {
				method: 'PUT'
			},
			getList: {
				method: 'GET'
			}
		});
	}
]);