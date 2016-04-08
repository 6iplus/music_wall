var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    Guid = require('Guid');
var bcrypt = require("bcrypt-nodejs");

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var myCollection = db.collection("hw3user");

        // setup your body
        exports.createUser = function(username,encryptedPassword,currentSessionId) {
            // throws an error if there has been invalid input
		if(!username||username==""||!encryptedPassword||encryptedPassword==""){
            // return a promise that resolves the new comment
		return Promise.reject("should input information");

}		var profile = {firstName:"", lastName:"", hobby:"", petName:""};

            return myCollection.insertOne({ _id: Guid.create().toString(),username: username, encryptedPassword: encryptedPassword, currentSessionId: currentSessionId, profile: profile });
        };
	
	exports.getUser = function(username) {
            return myCollection.find({username: username}).toArray();


	 };
	
	exports.editProfile = function(username, profile) {
            return myCollection.updateOne({ username: username }, { $set: { profile: profile }});

	 };

	exports.getUserBySessionId = function(currentSessionId) {
	return myCollection.find({currentSessionId: currentSessionId}).toArray();
	 };
	
	exports.editSessionId = function(username, currentSessionId) {
	return myCollection.updateOne({ username: username }, { $set: { currentSessionId: currentSessionId }});
	 };

    });
