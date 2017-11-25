let express = require('express');
let app = express();
let mongo = require('./mongoUtil');
let ObjectID = require('mongodb').ObjectID;
let bodyParser = require('body-parser');

app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/login', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    mongo.users().findOne({
        "username": username,
        "password": password
    }, function(err, result) {
        if (err) {
            throw err;
        } else if (result) {
            response.send(result._id);
        } else {
            console.log("no user found");
            response.send(null);
        }
    });
});

app.post('/new-user', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    mongo.users().insertOne({
        "username": username,
        "password": password
    }, (err, record) => {
        if (err) {
            throw err;
        } else {
            console.log("Id: " + record.insertedId);
            response.send(record.insertedId);
        }
    });
});

app.post('/find-user', function(request, response) {
    console.log()
    let _id = ObjectID.createFromHexString(request.body._id);
    mongo.users().findOne({
        "_id": _id
    }, (err, result) => {
        if (err) {
            throw err;
        } else if (result) {
            console.log("Username: " + result.username);
            response.send(result.username);
        } else {
            console.log("No user found with id " + _id);
            response.send(null);
        }
    })
});

app.listen(8080, function() {
    console.log("Listening on port 8080");
    mongo.connect();
})