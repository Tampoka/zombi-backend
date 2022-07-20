const express = require('express');
const users = require('./users/users-router')
const timers = require('./timers/timers-router')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

//create express app
const app = express();
const port = process.env.PORT || 4000;


mongoose.connect(process.env.MONGODB_URI);

//using body-parser as middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//starting path
app.get('/', function (req, res) {
    res.send('kuku');
})

//users router
app.use('/users', users)
app.use('/timers', timers)

//not-matching path
app.get("*", function (req, res) {
    res.sendStatus(404);
});
app.listen(port)
// }

