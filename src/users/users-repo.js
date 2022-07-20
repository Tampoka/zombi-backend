const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
})

const User = mongoose.model('MyUser', usersSchema)

const getUsers = (search) => {
    if (!search) return User.find()
    return User.findOne({name: new RegExp(`^${search}`)})
}

const getUserById = (userId) => {
    return User.findOne({_id: userId})
}

const updateUser = (userId, name) => {
    return User.updateOne({_id: userId}, {name})
}

const addUser = (name) => {
    const user = new User({name})
    return user.save()
    // return User.insertOne({name})
}

const deleteUser = (id) => {
    return User.deleteOne({_id: id})
}

exports.getUsers = getUsers
exports.getUsersById = getUserById
exports.addUser = addUser
exports.deleteUser = deleteUser
exports.updateUser = updateUser