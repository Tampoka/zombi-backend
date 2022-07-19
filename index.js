const express = require('express');
const users = require('./users-router')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

//create express app
const app = express();
let port = process.env.PORT||4000;
/*if (port == null || port === "") {
    port = 4000;
}*/

mongoose.connect(process.env.DB_HOST_STRING);

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

