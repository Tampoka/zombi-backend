const {addUser, getUsers, deleteUser, getUsersById, updateUser} = require('./users-repo');
const cors = require('cors');

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(cors(), (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

//adding routes
router.get('/', async (req, res) => {
    let users = await getUsers(req.query.search)

/*    if(!!req.query.search){
        users=users.filter(u=>u.name.indexOf(req.query.search)>-1)
    }*/
    res.send(users)
})
router.get('/:id', async (req, res) => {
    let userId = req.params.id
    let user = await getUsersById(userId)
    if (user) {
        res.send(user)
    } else {
        res.sendStatus(404)
    }
})
router.post('/', async (req, res) => {
    await addUser(req.body.name)
    res.send({success: true});
})
router.delete('/:id', async (req, res) => {
    await deleteUser(req.params.id)
    res.sendStatus(204);
})
router.put('/:id', async (req, res) => {
    const userId = req.params.id
    const name = req.body.userName
  await updateUser(userId, name)
    res.send({success: true});
})
router.get('/tasks', async (req, res) => {
    res.send("tasks")
})

module.exports = router



