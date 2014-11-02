'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var modoaccounts = require('../../app/controllers/modoaccounts');
	var modoAccountsProcess = require('../../app/controllers/modoaccounts-process');

	// Modoaccounts Routes
	app.route('/modoaccounts/getList')
		.get(modoAccountsProcess.getList);
		// .post(users.requiresLogin, modoaccounts.create);

	app.route('/modoaccounts/addCard')
		.post(modoAccountsProcess.addCard);

	app.route('/modoaccounts/testModoRoute')
		.get(modoAccountsProcess.testModoRoute);

	app.route('/modoaccounts/:modoaccountId')
		.get(modoaccounts.read)
		.put(users.requiresLogin, modoaccounts.hasAuthorization, modoaccounts.update)
		.delete(users.requiresLogin, modoaccounts.hasAuthorization, modoaccounts.delete);

	// Finish by binding the Modoaccount middleware
	app.param('modoaccountId', modoaccounts.modoaccountByID);
};