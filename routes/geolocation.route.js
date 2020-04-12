'use strict';

const Boom = require('@hapi/boom');
const getlocationController = require('../controllers/geolocation.controller');

module.exports = [{
	method: 'POST',
	config: {
		auth: 'firebase'
	},
	path: '/api/geo-locations',
	handler: async (request, h) => {
		try {
			const payload = {
				user_id: request.user.user_id,
				coordinates: [request.payload.longitude, request.payload.latitude],
				timestamp: request.payload.timestamp
			};
			if (!request.payload.longitude) {
				return Boom.badRequest('Longitude is required');
			} else if (!request.payload.latitude) {
				return Boom.badRequest('Latitude is required');
			} else {
				const output = await getlocationController.saveLocation(payload);
				const response = {
					type: 'Success',
					message: 'Geolocation successfully saved',
					body: output
				}
				return h.response(response);
			}

		} catch (error) {
			return Boom.badImplementation();
		}
	}
}];