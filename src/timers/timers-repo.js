const mongoose = require('mongoose');

const timersSchema = new mongoose.Schema({
    title: String,
    project: String,
    elapsed: Number,
    runningSince: Number || null,
})

const Timer = mongoose.model("timer", timersSchema)


const getTimers = () => {
    return Timer.find()
}

const getTimerById = (userId) => {
    return Timer.findOne({_id: userId})
}

const updateTimer = (timerId, title, project) => {
    return Timer.updateOne({_id: timerId}, {title, project})
}

const addTimer = (title, project) => {
    console.log(title, project)
    const timer = new Timer({
        title,
        project,
        elapsed: 0,
        runningSince: null
    })
    return timer.save()
    // return Timer.insertOne({name})
}

const startTimer = (timerId, startValue) => {
    return Timer.updateOne({_id: timerId}, {runningSince: startValue})
}

const stopTimer = (timerId, stopValue) => {
    const currentRunningSince = Timer.findOne({_id: timerId}, {runningSince: 1})
    const delta = stopValue - currentRunningSince
    const currentElapsed = Timer.findOne({_id: timerId}, {elapsed: 1})
    const updatedElapsed = currentElapsed + delta
    return Timer.updateOne({_id: timerId}, {elapsed: updatedElapsed, runningSince: null})
}

const deleteTimer = (id) => {
    return Timer.deleteOne({_id: id})
}

exports.getTimers = getTimers
exports.getTimerById = getTimerById
exports.addTimer = addTimer
exports.startTimer = startTimer
exports.stopTimer = stopTimer
exports.updateTimer = updateTimer
exports.deleteTimer = deleteTimer
