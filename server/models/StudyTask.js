const mongoose = require("mongoose");

const studyTaskSchema = new mongoose.Schema({

    subject: {
        type: String,
        required: true
    },

    studyNotes: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        required: true
    },

    studyHours: {
        type: Number,
        required: true
    },

    deadline: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model(
    "StudyTask",
    studyTaskSchema
);