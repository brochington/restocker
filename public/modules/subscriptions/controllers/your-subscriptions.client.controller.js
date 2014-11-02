'use strict';

angular.module('subscriptions').controller('YourSubscriptionsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Subscriptions', 'ngToast',
	function($scope, $http, $stateParams, $location, Authentication, Subscriptions, Modoaccounts, ngToast){
		$scope.authentication = Authentication;

		$scope.testing = 'testing this controller!!!';

		$scope.staplesData = [];

		$scope.init = function(){
			console.log('something');
			$http.get('/staples/getData').success(function(val){
				console.log('staples, man.', val);
				$scope.staplesData = val.results.collection1;
			});

			$http.get('/modoaccount/getList').success(function(val){
				console.log('getListCallback');
			});
		};
	}
]);

