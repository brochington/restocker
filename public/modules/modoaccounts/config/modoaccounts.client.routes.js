'use strict';

//Setting up route
angular.module('modoaccounts').config(['$stateProvider',
	function($stateProvider) {
		// Modoaccounts state routing
		$stateProvider.
		state('listModoaccounts', {
			url: '/modoaccounts',
			templateUrl: 'modules/modoaccounts/views/list-modoaccounts.client.view.html'
		}).
		state('createModoaccount', {
			url: '/modoaccounts/create',
			templateUrl: 'modules/modoaccounts/views/create-modoaccount.client.view.html'
		}).
		state('viewModoaccount', {
			url: '/modoaccounts/:modoaccountId',
			templateUrl: 'modules/modoaccounts/views/view-modoaccount.client.view.html'
		}).
		state('editModoaccount', {
			url: '/modoaccounts/:modoaccountId/edit',
			templateUrl: 'modules/modoaccounts/views/edit-modoaccount.client.view.html'
		});
	}
]);