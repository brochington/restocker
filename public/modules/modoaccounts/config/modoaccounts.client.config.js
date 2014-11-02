'use strict';

// Configuring the Articles module
angular.module('modoaccounts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('topbar', 'Modoaccounts', 'modoaccounts', 'dropdown', '/modoaccounts(/create)?');
		// Menus.addSubMenuItem('topbar', 'modoaccounts', 'List Modoaccounts', 'modoaccounts');
		// Menus.addSubMenuItem('topbar', 'modoaccounts', 'New Modoaccount', 'modoaccounts/create');
	}
]);