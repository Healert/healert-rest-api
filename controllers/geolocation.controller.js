'use strict';

const Joi = require('@hapi/joi');
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

	/**
	 * Joi validation schema for longitude and latitude
	 */
	saveValidationSchema: Joi.object({
		longitude: Joi.number().required().error((errors) => {
			return errors.map(error => {
				switch (error.type) {
					case "number.base":
						return {
							message: "Longitude must be number"
						};
					case "any.required":
						return {
							message: "Longitude is required"
						};
				}
			})
		}),
		latitude: Joi.number().required().error((errors) => {
			return errors.map(error => {
				switch (error.type) {
					case "number.base":
						return {
							message: "Latitude must be number"
						};
					case "any.required":
						return {
							message: "Latitude is required"
						};
				}
			})
		})
	})
}

module.exports = getlocationController;