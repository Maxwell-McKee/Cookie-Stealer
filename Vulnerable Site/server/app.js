let express = require('express');
let app = express();
let mongo = require('./mongoUtil');
let ObjectID = require('mongodb').ObjectID;
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

app.use(express.static(__dirname + "/../client"));
app.use(cookieParser());
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

app.get('/find-user', function(request, response) {
    console.log("Got Cookie: UserId = " + request.cookies.userId);
    if (!request.cookies.userId) {
        response.send();
    }
    let _id = ObjectID.createFromHexString(request.cookies.userId);
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

app.get('/get-posts', function(request, response) {
    console.log("Fetching posts");
    mongo.posts().find({}, { "_id": false }).toArray((err, docs) => {
        response.json(docs);
    });
});

app.post('/write-post', function(request, response) {
    console.log("Writing post: ");
    console.log(request.body.content);
    let _id = ObjectID.createFromHexString(request.cookies.userId);
    mongo.users().findOne({
        "_id": _id
    }, (err, result) => {
        if (err) {
            throw err;
        } else if (result) {
            mongo.posts().insertOne({
                "poster": result.username,
                "content": request.body.content,
                "date": new Date()
            }, (err, r) => {
                if (err) {
                    throw err;
                } else {
                    response.status(200).send();
                }
            });
        } else {
            console.log("Error writing post, no user found");
        }
    });
});

app.listen(80, function() {
    console.log("Listening on port 80");
    mongo.connect();
})