'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Modoaccount Schema
 */
var ModoaccountSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Modoaccount name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Modoaccount', ModoaccountSchema);