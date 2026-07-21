const express = require("express");

const router = express.Router();

const StudyTask = require("../models/StudyTask");


// GET TASKS
router.get("/", async (req, res) => {

    try {

        const tasks = await StudyTask.find();

        res.json(tasks);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});


// ADD TASK
router.post("/", async (req, res) => {

    try {

        console.log(req.body);

        const newTask = new StudyTask({

            subject: req.body.subject,

            studyNotes: req.body.studyNotes,

            priority: req.body.priority,

            studyHours: req.body.studyHours,

            deadline: req.body.deadline

        });

        await newTask.save();

        res.status(201).json(newTask);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});


// UPDATE TASK
router.put("/:id", async (req, res) => {

    try {

        const updatedTask =
            await StudyTask.findByIdAndUpdate(

                req.params.id,

                {

                    subject: req.body.subject,

                    studyNotes: req.body.studyNotes,

                    priority: req.body.priority,

                    studyHours: req.body.studyHours,

                    deadline: req.body.deadline

                },

                {
                    new: true
                }

            );

        res.json(updatedTask);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE TASK
router.delete("/:id", async (req, res) => {

    try {

        await StudyTask.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task Deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;