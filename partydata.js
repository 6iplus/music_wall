var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    Guid = require('Guid');
var bcrypt = require("bcrypt-nodejs");

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var myCollection = db.collection("party");

        // setup your body
	exports.getPartyById = function(partyId){
return myCollection.find({partyId: partyId}).toArray();
};
	
	exports.createParty = function(partyId, partyName, createdBy, playList, config){
	return myCollection.insertOne({_id: Guid.create().toString(), partyId: partyId, partyName: partyName, createdBy: createdBy, playList: playList, config: config});

}

    });
