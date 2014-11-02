'use strict';

(function() {
	// Subscriptions Controller Spec
	describe('Subscriptions Controller Tests', function() {
		// Initialize global variables
		var SubscriptionsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Subscriptions controller.
			SubscriptionsController = $controller('SubscriptionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Subscription object fetched from XHR', inject(function(Subscriptions) {
			// Create sample Subscription using the Subscriptions service
			var sampleSubscription = new Subscriptions({
				name: 'New Subscription'
			});

			// Create a sample Subscriptions array that includes the new Subscription
			var sampleSubscriptions = [sampleSubscription];

			// Set GET response
			$httpBackend.expectGET('subscriptions').respond(sampleSubscriptions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.subscriptions).toEqualData(sampleSubscriptions);
		}));

		it('$scope.findOne() should create an array with one Subscription object fetched from XHR using a subscriptionId URL parameter', inject(function(Subscriptions) {
			// Define a sample Subscription object
			var sampleSubscription = new Subscriptions({
				name: 'New Subscription'
			});

			// Set the URL parameter
			$stateParams.subscriptionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/subscriptions\/([0-9a-fA-F]{24})$/).respond(sampleSubscription);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.subscription).toEqualData(sampleSubscription);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Subscriptions) {
			// Create a sample Subscription object
			var sampleSubscriptionPostData = new Subscriptions({
				name: 'New Subscription'
			});

			// Create a sample Subscription response
			var sampleSubscriptionResponse = new Subscriptions({
				_id: '525cf20451979dea2c000001',
				name: 'New Subscription'
			});

			// Fixture mock form input values
			scope.name = 'New Subscription';

			// Set POST response
			$httpBackend.expectPOST('subscriptions', sampleSubscriptionPostData).respond(sampleSubscriptionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Subscription was created
			expect($location.path()).toBe('/subscriptions/' + sampleSubscriptionResponse._id);
		}));

		it('$scope.update() should update a valid Subscription', inject(function(Subscriptions) {
			// Define a sample Subscription put data
			var sampleSubscriptionPutData = new Subscriptions({
				_id: '525cf20451979dea2c000001',
				name: 'New Subscription'
			});

			// Mock Subscription in scope
			scope.subscription = sampleSubscriptionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/subscriptions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/subscriptions/' + sampleSubscriptionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid subscriptionId and remove the Subscription from the scope', inject(function(Subscriptions) {
			// Create new Subscription object
			var sampleSubscription = new Subscriptions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Subscriptions array and include the Subscription
			scope.subscriptions = [sampleSubscription];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/subscriptions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSubscription);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.subscriptions.length).toBe(0);
		}));
	});
}());