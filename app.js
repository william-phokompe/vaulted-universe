var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    id = require('shortid'),
    Exercise = require('./models/exercise');

var users = function(request, response) {
    User.find({}, (error, result) => {
        if (error)
            response.send(error);
        response.json(result); 
    });
}, createUser = function(request, response) {
    var new_user = new User({
        userId: id.generate(),
        username: request.body.username,
        exercise: request.body.exercise
    });

    new_user.save((error, result) => {
        if (error)
            response.send(error);
        response.json(result);
    });
}, createExercise = function(request, response) {
    var newExercise = new Exercise(
        request.body.userid,
        request.body.description,
        request.body.duration,
        new Date(request.body.date)
    );

    User.findOne({ userId: newExercise.userId }, (error, data) => {
        if (error)
            response.send(error);
        var document = new User(data);
        document.exercise.push(newExercise);
        document.save((err, res) => {
            if (err) {
                response.send(err);
            }
            response.json(res);
        });
    });
};

module.exports = {
    users,
    createUser,
    createExercise
};