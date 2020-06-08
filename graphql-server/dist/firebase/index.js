"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require('firebase/app');
var database = require('firebase/database');
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
var firebaseCache;
var getFirebase = function () {
    if (firebaseCache) {
        return firebaseCache;
    }
    firebase.initializeApp(config);
    firebaseCache = firebase;
    return firebase;
};
exports.default = getFirebase;
