const admin = require('firebase-admin');
const axios = require('axios');
const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyC4s6E4bjEw01GoEAFBw3It46kzGnhjnJ4",
    authDomain: "covid-19-tracking-50be3.firebaseapp.com",
    databaseURL: "https://covid-19-tracking-50be3.firebaseio.com",
    projectId: "covid-19-tracking-50be3",
    storageBucket: "covid-19-tracking-50be3.appspot.com",
    messagingSenderId: "93406967975",
    appId: "1:93406967975:web:5c69cfb1aa85565cd14382",
    measurementId: "G-XD7TC1SED2"
  };
const firebaseClient = firebase.initializeApp(firebaseConfig);

const serviceAccount = '../config/service-account-file.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_DB || 'db'}.firebaseio.com`
});

async function prepareRequest() {
    let uid = process.env.SAMPLE_USER_ID;
    const idToken = await admin.auth().createCustomToken(uid);
    const userCredential = await firebaseClient.auth().signInWithCustomToken(idToken);
    const token = await userCredential.user.getIdToken();
    console.log('Token for your rest client:', token);
    return axios.create({
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

async function sendRequest() {
    const request = await prepareRequest();
    const result = await request.get('http://localhost:4000/api/wolves');
    console.log('Data', result.data)
}

sendRequest();