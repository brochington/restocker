'use strict';

angular.module('subscriptions').controller('SubscribeItemController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Subscriptions', 'ngToast',
	function($scope, $http, $stateParams, $location, Authentication, Subscriptions, Modoaccounts, ngToast){
		$scope.authentication = Authentication;

		$scope.deliveryScheduleOptions = [{name: 'Weekly'},{name: 'Monthly'},{name: 'Daily'}];

		$scope.subscribeToItem = function(index, data){
			console.log('askjfhaskjd');
			console.log(index, data);
			// ngToast.create('You subscribed to: ' + data.toString());
			$http.post('/subscriptions/createSubscription', data).success(function(){
				console.log('yo man, it worked.');
				ngToast.create('You subscribed to: ' + data);
			});

		};
	}]);

