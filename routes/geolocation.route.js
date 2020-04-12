'use strict';
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const getlocationController = require('../controllers/geolocation.controller');

module.exports = [{
	method: 'POST',
	config: {
		auth: 'firebase',
		description: 'Save Location Log',
		notes: 'Returns the newly created location log',
		tags: ['api'],
		validate: {
			payload: Joi.object({
				longitude: Joi.number().min(-90).max(90)
					.required().description('Longitude'),
				latitude: Joi.number().min(-180).max(180)
					.required().description('Latitude'),
				timestamp: Joi.date().required().timestamp('unix')
					.description('Log unix timestamp'),
			}),
			failAction: async (request, h, err) => {
				throw err;
			}
		}
	},
	path: '/api/geo-locations',
	handler: async (request, h) => {
		try {
			const payload = {
				user_id: request.user.user_id,
				coordinates: [request.payload.longitude, request.payload.latitude],
				timestamp: request.payload.timestamp
			};
			const output = await getlocationController.saveLocation(payload);
			const response = {
				type: 'Success',
				message: 'Geolocation successfully saved',
				body: output
			}
			return h.response(response);

		} catch (error) {
			return Boom.badImplementation();
		}
	},
	method: 'POST',
	config: {
		auth: 'firebase',
		description: 'Upload Bulk Location Logs',
		notes: 'Returns the newly created bulk location logs',
		tags: ['api'],
		validate: {
			payload: Joi.object({
				locations: Joi.array().items({
					longitude: Joi.number().min(-90).max(90)
						.required().description('Longitude'),
					latitude: Joi.number().min(-180).max(180)
						.required().description('Latitude'),
					timestamp: Joi.date().required().timestamp('unix')
						.description('Log unix timestamp'),
				}),
			}),

			failAction: async (request, h, err) => {
				throw err;
			}
		}
	},
	path: '/api/geo-locations/bulk',
	handler: async (request, h) => {
		try {
			const payload = request.payload.locations;
			const user_id = request.user.user_id;

			const output = await getlocationController.uploadBulk(payload, user_id);

			const response = {
				type: 'Success',
				message: 'Geolocations saved successfully ',
				body: output
			};

			return h.response(response);

		} catch (error) {
			return Boom.badImplementation();
		}
	}
}];
