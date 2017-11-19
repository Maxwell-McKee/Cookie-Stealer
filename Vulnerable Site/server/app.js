let express = require('express');
let app = express();
let mongo = require('./mongoUtil');

app.use(express.static(__dirname + "/../client"));

app.get('/states', (request, response) => {
    let menus = mongo.menus();
    menus.find({ "name": "states" }).toArray((err, docs) => {
        response.status(200).json(docs[0].states);
    })
});

app.get('/days', (request, response) => {
    let menus = mongo.menus();
    menus.find({ "name": "days" }).toArray((err, docs) => {
        response.status(200).json(docs[0].days);
    })

})

app.listen(8080, function() {
    console.log("Listening on port 8080");
    mongo.connect();
});