'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', 'ngToast',
	function($scope, $http, $location, Authentication, ngToast) {
		$scope.authentication = Authentication;

		$scope.showSignupMessage = false;
		

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.toastMessage = function(){
			console.log('trying to create a toast message...');
			console.log(ngToast);
			ngToast.create('Here is a message...');	
		};

		$scope.startUserSignup = function(){

			console.log('clicked me!!!!');
			ngToast.create('this might take a second....');
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				console.log('geting here..');
				// console.log(response);
				// console.log($scope.authentication.user);
				$scope.authentication.user = response;

				ngToast.create('created a user!!');
				// And redirect to the index page
				$location.path('/settings/profile?status=new');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// $scope.signup = function() {
		// 	$http.post('/auth/signup', $scope.credentials).success(function(response) {
		// 		// If successful we assign the response to the global user model
		// 		$scope.authentication.user = response;

		// 		// And redirect to the index page
		// 		$location.path('/');
		// 	}).error(function(response) {
		// 		$scope.error = response.message;
		// 	});
		// };

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);