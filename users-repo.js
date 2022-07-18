const fs = require('fs')
// const {readJsonFromFile, writeJsonToFile} = require('./fs-utils');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
/*

//defining schema for db
const usersSchema = new mongoose.Schema({
    name: String,
})

const User = mongoose.model('MyUser', usersSchema)
*/

// Replace the uri string with your connection string.
const uri = "mongodb+srv://Tampoka:6nTZ5ias0ELVU4KE@cluster0.koldo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
/*async function run() {
    try {
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');
        // Query for a movie that has the title 'Back to the Future'
        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);
        console.log(movie);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}*/

const database = client.db('BigTest');
const myUsers = database.collection('myusers');
/*// Query for a user that has the name 'hello'
const query = { name: 'hello' };
const user1 = await myUsers.findOne(query);
console.log(user1);*/

const getUsers = (search) => {
    if (!search) return myUsers.find()
    return myUsers.findOne({name: new RegExp(`^${search}`)})
}

const getUserById = (userId) => {
    return myUsers.findOne({_id: userId})
}

/*const updateUser = async (userId, name) => {
    let users = await getUsers()
    const updatedUsers = users.map(u => u.id === userId ? {...u, name} : u)
    return writeJsonToFile("users.json", updatedUsers)
}*/

const updateUser = (userId, name) => {
    return myUsers.updateOne({_id: userId}, {name})
}

const addUser = async (name) => {
    // const user = new User({name})
    // return user.save()
    return myUsers.insertOne({name})
}

const deleteUser = async (id) => {
    return myUsers.deleteOne({_id: id})
}

exports.getUsers = getUsers
exports.addUser = addUser
exports.deleteUser = deleteUser
exports.getUsersById = getUserById
exports.updateUser = updateUser