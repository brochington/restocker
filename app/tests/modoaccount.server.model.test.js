'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Modoaccount = mongoose.model('Modoaccount');

/**
 * Globals
 */
var user, modoaccount;

/**
 * Unit tests
 */
describe('Modoaccount Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			modoaccount = new Modoaccount({
				name: 'Modoaccount Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return modoaccount.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			modoaccount.name = '';

			return modoaccount.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Modoaccount.remove().exec();
		User.remove().exec();

		done();
	});
});