const fs = require('fs')
const {readJsonFromFile, writeJsonToFile} = require('./fs-utils');
const mongoose = require('mongoose');

//defining schema for db
const usersSchema = new mongoose.Schema({
    name: String,
})

const User = mongoose.model('MyUser', usersSchema)

const getUsers = (search) => {
    if (!search) return User.find()
    return User.find({name: new RegExp(`^${search}`)})
}

const getUserById = (userId) => {
    return User.find({_id: userId})
}

/*const updateUser = async (userId, name) => {
    let users = await getUsers()
    const updatedUsers = users.map(u => u.id === userId ? {...u, name} : u)
    return writeJsonToFile("users.json", updatedUsers)
}*/

const updateUser = (userId, name) => {
   return User.updateOne({_id:userId},{name})
}

const addUser = async (name) => {
    const user = new User({name})
    return user.save()
}

const deleteUser = async (id) => {
    return User.deleteOne({_id: id})
}


exports.getUsers = getUsers
exports.addUser = addUser
exports.deleteUser = deleteUser
exports.getUsersById = getUserById
exports.updateUser = updateUser