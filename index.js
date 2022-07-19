const express = require('express');
const users = require('./users-router')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//create express app
const app = express();
let port = process.env.PORT||4000;
/*if (port == null || port === "") {
    port = 4000;
}*/

mongoose.connect(
    "mongodb+srv://Tampoka:6nTZ5ias0ELVU4KE@cluster0.koldo.mongodb.net/BigTest?retryWrites=true&w=majority",
);

//using body-parser as middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
/*
//connecting to db through mongoose
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/BigTest');*/

// mongoose.connect('mongodb://localhost:27017/BigTest');


//starting path
    app.get('/', function (req, res) {
        res.send('kuku');
    })

//users router
    app.use('/users', users)

//not-matching path
    app.get("*", function (req, res) {
        res.sendStatus(404);
    });
    app.listen(port)
// }

