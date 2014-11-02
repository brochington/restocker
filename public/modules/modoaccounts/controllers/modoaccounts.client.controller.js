'use strict';

// Modoaccounts controller
angular.module('modoaccounts').controller('ModoaccountsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Modoaccounts',
	function($scope, $stateParams, $location, Authentication, Modoaccounts ) {
		$scope.authentication = Authentication;

		// Create new Modoaccount
		$scope.create = function() {
			// Create new Modoaccount object
			var modoaccount = new Modoaccounts ({
				name: this.name
			});

			// Redirect after save
			modoaccount.$save(function(response) {
				$location.path('modoaccounts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Modoaccount
		$scope.remove = function( modoaccount ) {
			if ( modoaccount ) { modoaccount.$remove();

				for (var i in $scope.modoaccounts ) {
					if ($scope.modoaccounts [i] === modoaccount ) {
						$scope.modoaccounts.splice(i, 1);
					}
				}
			} else {
				$scope.modoaccount.$remove(function() {
					$location.path('modoaccounts');
				});
			}
		};

		// Update existing Modoaccount
		$scope.update = function() {
			var modoaccount = $scope.modoaccount ;

			modoaccount.$update(function() {
				$location.path('modoaccounts/' + modoaccount._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Modoaccounts
		$scope.find = function() {
			$scope.modoaccounts = Modoaccounts.query();
		};

		// Find existing Modoaccount
		$scope.findOne = function() {
			$scope.modoaccount = Modoaccounts.get({ 
				modoaccountId: $stateParams.modoaccountId
			});
		};
	}
]);