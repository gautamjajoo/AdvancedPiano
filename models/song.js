const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    keyShift: {
        type: Boolean,
        required: true
    },
    keySection: {
        type: Number,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    }
})

const songSchema = new mongoose.Schema({
    notes: [noteSchema]
})

module.exports = mongoose.model('Songs', songSchema)