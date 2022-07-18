const fs = require('fs')
const {readJsonFromFile, writeJsonToFile} = require('./fs-utils');
const {v4: uuidv1} = require('uuid')

/*const getUsers = (cb) => {
    fs.readFile("users.json", function (err, buf) {
        cb(buf.toString())
    })
}*/

const filePath="users.json"

const getUsers = () => {
    return readJsonFromFile(filePath)
}

const getUserById = async (userId) => {
    let users = await getUsers()
    return users.find(u => u.id === userId)
}

const updateUser = async (userId, name) => {
    let users = await getUsers()
    const updatedUsers = users.map(u => u.id === userId ? {...u, name} : u)
    return writeJsonToFile(filePath,updatedUsers)
}

const addUser = async (name) => {
    let users = await getUsers()
    users.push({id: uuidv1(), name})
    return writeJsonToFile(filePath, users)
}

const deleteUser = async (userId) => {
    let users = await getUsers()
    const updatedUsers = users.filter(u => u.id !== userId)
    return writeJsonToFile(filePath, updatedUsers)
}


exports.getUsers = getUsers
exports.addUser = addUser
exports.deleteUser = deleteUser
exports.getUsersById = getUserById
exports.updateUser = updateUser