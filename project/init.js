var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
constants = require("./backend/constants")

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", 
async function (err, client) 
{
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");
  db.collection(constants.ACTIONS_COLLECTION).remove({});
  db.collection(constants.TEMPLATES_COLLECTION).remove({});
  db.collection(constants.SUBACTIONS_COLLECTION).remove({});

  await db.createCollection(constants.ACTIONS_COLLECTION);
  await db.createCollection(constants.TEMPLATES_COLLECTION);
  await db.createCollection(constants.SUBACTIONS_COLLECTION);
  
  console.log("Created collections");
  

});