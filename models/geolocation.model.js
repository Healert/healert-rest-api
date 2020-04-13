'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GeolocationSchema = new Schema({
	location: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	timestamp: {
		type: Date,
		default: Date.now,
		required: true
	},
	user_id: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Geolocation', GeolocationSchema);