'use strict';

const Geolocation = require('../models/geolocation.model');

const getlocationController = {
	saveLocation: async (payload) => {
		try {
			const location = {
				type: 'Point',
				coordinates: payload.coordinates
			};
			const newLocation = new Geolocation({
				location,
				timestamp: payload.timestamp,
				user_id: payload.user_id
			});
			return await newLocation.save();
		} catch (error) {
			return error;
		}
	}
}

module.exports = getlocationController;