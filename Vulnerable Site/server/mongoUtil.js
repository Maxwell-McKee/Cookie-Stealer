"use strict"

let mongo = require("mongodb");
let client = mongo.client;
let _db;

module.exports = {
    connect() {
        _db = mongo.connect("mongodb://localhost:27017/bad-site", (err, db) => {
            if (err) {
                console.error("Could not connect to db, check connection");
                process.exit();
            } else {
                _db = db;
                console.log("Connected successfully");
            }
        });
    },

    users() {
        return _db.collection("users");
    },

    posts() {
        return _db.collection("posts");
    }
}