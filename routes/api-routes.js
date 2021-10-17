const mongoose = require("mongoose");
const apiRouter = require("express").Router();
const db = require("../models");

apiRouter.get("/api/workouts", (req, res) => {
    console.log("For init function & getLastWorkout Router");

    db.Workout.aggregate([
        {
            $set: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ]).then(result => {
        console.log("Result of Aggregate");
        console.log(result);
        res.json(result);
    });
});

apiRouter.get("/api/workouts/range", (req, res) => {
    console.log("Dash Board to get all information");
   
    db.Workout.aggregate([
        {
            $set: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ]).sort({day: -1}).limit(7).sort({ day: 1 }).then(result => {
        console.log("Result of Aggregate");
        console.log(result);
        res.json(result);
    });

});


apiRouter.post("/api/workouts", (req, res) => {
    console.log("For initExercise function& createWorkout Router");
    console.log(req.body);
    // db.Workout.create({ exercises: req.body }).then(result => {
    db.Workout.create({ name : "Workout Plan"}).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json(err);
    });
});

apiRouter.put("/api/workouts/:id", (req, res) => {
    console.log(req.body);

    console.log("There is ID");
    console.log(req.params.id);
    db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("Aggregate func");
            console.log(req.params.id);
            res.json(data);
        }
    });

});



module.exports = apiRouter;