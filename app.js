'use strict';

const Hapi = require('@hapi/hapi');


const init = async () => {

	const port = process.env.PORT || 4000;
	const server = Hapi.server({
		port
	});

	const db = require('./config/database').db;

	await server.register({
		plugin: require('hapi-router'),
		options: {
			routes: 'routes/**/*.js'
		}
	})

	server.route({
		method: 'GET',
		path: '/',
		handler: (request, h) => {

			return {
				status: 'ok',
				message: 'Healert server is up and running'
			};
		}
	});

	server.route({
		method: 'GET',
		path: '/api',
		handler: (request, h) => {

			return {
				status: 'ok',
				message: 'Api Home'
			};
		}
	});

	await server.start();
	console.log('Server running on %s', server.info.uri);
};

init();
