'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const init = async () => {

	const port = process.env.PORT || 4000;
	const server = Hapi.server({
		port
	});
	const db = require('./config/database').db;
	const swaggerOptions = {
		info: {
			title: 'Healert API Documentation',
			version: Pack.version,
		},
		securityDefinitions: {
			jwt: {
				type: 'apiKey',
				name: 'Authorization',
				in: 'header'
			}
		},
	};

	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: swaggerOptions
		}
	]);
	// Load Hapi-Firebase Auth Strategy
	const HapiFirebaseAuth = require('./plugins/firebase-auth');

	// Register the plugin
	await server.register({
		plugin: HapiFirebaseAuth
	});
	const firebaseConfig = './config/service-account-file.json';
	const admin = require('firebase-admin');
	admin.initializeApp({
		credential: admin.credential.cert(firebaseConfig),
		databaseURL: `https://${process.env.FIREBASE_DB || 'db'}.firebaseio.com`
	});
	// Include auth strategy
	server.auth.strategy('firebase', 'firebase', {
		instance: admin
	});
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
