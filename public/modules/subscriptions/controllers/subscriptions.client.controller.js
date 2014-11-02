'use strict';

// Subscriptions controller
angular.module('subscriptions').controller('SubscriptionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Subscriptions',
	function($scope, $stateParams, $location, Authentication, Subscriptions ) {
		$scope.authentication = Authentication;

		// Create new Subscription
		$scope.create = function() {
			// Create new Subscription object
			var subscription = new Subscriptions ({
				name: this.name
			});

			// Redirect after save
			subscription.$save(function(response) {
				$location.path('subscriptions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Subscription
		$scope.remove = function( subscription ) {
			if ( subscription ) { subscription.$remove();

				for (var i in $scope.subscriptions ) {
					if ($scope.subscriptions [i] === subscription ) {
						$scope.subscriptions.splice(i, 1);
					}
				}
			} else {
				$scope.subscription.$remove(function() {
					$location.path('subscriptions');
				});
			}
		};

		// Update existing Subscription
		$scope.update = function() {
			var subscription = $scope.subscription ;

			subscription.$update(function() {
				$location.path('subscriptions/' + subscription._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Subscriptions
		$scope.find = function() {
			$scope.subscriptions = Subscriptions.query();
		};

		// Find existing Subscription
		$scope.findOne = function() {
			$scope.subscription = Subscriptions.get({ 
				subscriptionId: $stateParams.subscriptionId
			});
		};
	}
]);