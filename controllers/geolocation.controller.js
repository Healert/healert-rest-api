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
	},
	uploadBulk: async (payload, user_id) => {
		try {
			if (payload.length) {
				const locations = [];
				payload.forEach((item) => {
					const location = {
						type: 'Point',
						coordinates: [item.longitude, item.latitude]
					};
					locations.push({
						user_id,
						location,
						timestamp: item.timestamp
					});
				});
				return await Geolocation.insertMany(locations);
			} else {
				return [];
			}
			
		} catch (error) {
			throw error;
		}
	}
}

module.exports = getlocationController;