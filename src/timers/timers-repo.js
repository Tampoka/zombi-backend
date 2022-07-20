const mongoose = require('mongoose');

const timersSchema = new mongoose.Schema({
    title: String,
    project: String,
    id: String,
    elapsed: Number,
    runningSince: Number || null,
})

const Timer = mongoose.model("timer", timersSchema)


const getTimers = () => {
    return Timer.find()
}

const getTimerById = (userId) => {
    return Timer.findOne({id: userId})
}

const updateTimer = (timerId, title, project) => {
    return Timer.updateOne({id: timerId}, {title, project})
}

const addTimer = (timerId, title, project) => {
    const timer = new Timer({
        title,
        project,
        timerId,
        elapsed: 0,
        runningSince: null
    })
    return timer.save()
    // return Timer.insertOne({name})
}

const startTimer = (timerId, startValue) => {
    return Timer.updateOne({id: timerId}, {runningSince: startValue})
}

const stopTimer = (timerId, stopValue) => {
    const [timer] = getTimerById(timerId)
    const delta = stopValue - timer.runningSince
    const updatedElapsed = timer.elapsed + delta
    return Timer.updateOne({id: timerId}, {elapsed: updatedElapsed, runningSince: null})
}


const deleteTimer = (id) => {
    return Timer.deleteOne({id})
}

exports.getTimers = getTimers
exports.getTimerById = getTimerById
exports.addTimer = addTimer
exports.startTimer = startTimer
exports.stopTimer = stopTimer
exports.updateTimer = updateTimer
exports.deleteTimer = deleteTimer
