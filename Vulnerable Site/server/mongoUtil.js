"use strict"

let mongo = require("mongodb");
let client = mongo.client;
let _db;

module.exports = {
    connect() {
        _db = mongo.connect("mongodb://localhost:27017/skills-search", (err, db) => {
            if (err) {
                console.error("Could not connect to db, check connection");
                process.exit();
            } else {
                _db = db;
                console.log("Connected successfully");
            }
        });
    },

    menus() {
        return _db.collection("menus");
    }
}