'use strict';

const Hapi = require('@hapi/hapi');


const init = async () => {

	const port = process.env.PORT || 4000;
	const server = Hapi.server({
		port
	});
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
