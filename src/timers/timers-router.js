const {
    addTimer,
    getTimers,
    deleteTimer,
    getTimerById,
    updateTimer,
    startTimer,
    stopTimer
} = require('./timers-repo');
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
    let timers = await getTimers()
    res.send(timers)
})
router.get('/:id', async (req, res) => {
    let timerId = req.params.id
    let timer = await getTimerById(timerId)
    if (timer) {
        res.send(timer)
    } else {
        res.sendStatus(404)
    }
})
router.post('/', async (req, res) => {
    await addTimer( req.body.title, req.body.project)
    res.send({success: true});
})
router.post('/start', async (req, res) => {
    const timerId = req.body.id
    const startValue = req.body.start
    await startTimer(timerId, startValue)
    res.send({success: true});
})
router.post('/stop', async (req, res) => {
    const timerId = req.body.id
    const stopValue = req.body.stop
    await stopTimer(timerId, stopValue)
    res.send({success: true});
})
router.delete('/', async (req, res) => {
    await deleteTimer(req.body.id)
    res.sendStatus(204);
})
router.put('/', async (req, res) => {
    const timerId = req.body.id
    const title = req.body.title
    const project = req.body.project
    await updateTimer(timerId, title, project)
    res.send({success: true});
})
router.get('/molasses', (_, res) => {
    setTimeout(() => {
        res.end();
    }, 5000);
})

module.exports = router



