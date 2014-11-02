'use strict';

angular.module('subscriptions').controller('YourSubscriptionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Subscriptions',
	function($scope, $stateParams, $location, Authentication, Subscriptions){
		$scope.authentication = Authentication;

		$scope.testing = 'testing this controller!!!';

		$scope.init = function(){

		};
	}
]);