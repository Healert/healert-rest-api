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
			const coordinates = {
				longitude: request.payload.longitude,
				latitude: request.payload.latitude
			}
			const {
				error
			} = getlocationController.saveValidationSchema.validate(coordinates, {
				abortEarly: false
			});
			if (error) {
				const err = Boom.badRequest('Missing required fields', {
					error: error.details
				});
				err.output.payload.details = err.data;
				return err;
			} else {
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
			}

		} catch (error) {
			return Boom.badImplementation(error);
		}
	}
}];