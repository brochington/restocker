'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Subscription Schema
 */
var SubscriptionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Subscription name',
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

mongoose.model('Subscription', SubscriptionSchema);