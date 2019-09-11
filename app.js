var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    id = require('shortid'),
    Exercise = require('./models/exercise');

var drawFields = function(_, response) {
    response.sendFile(`${__dirname}/views/index.htm`);
}, users = function(request, response) {
    User.find({}, (error, result) => {
        if (error) {
            response.send(error);
            return ;
        }
        response.json(result); 
    });
}, createUser = function(request, response) {
    var new_user = new User({
        userId: id.generate(),
        username: request.body.username,
        exercise: request.body.exercise
    });

    new_user.save((error, result) => {
        if (error) {
            response.send(error);
            return ;
        }
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
        if (error) {
            response.send(error);
            return ;
        }
        var document = new User(data);
        document.exercise.push(newExercise);
        document.save((err, res) => {
            if (err) {
                response.send(err);
            }
            response.json(res);
        });
    });
}, findUser = function(request, response) {
    var filter = { userId: request.query.userId };
    User.find(filter)
        .where('exercise')
        .exec((error, resp) => {
            if (error) {
                response.send(error);
                return;
            }
            var obj = JSON.parse(JSON.stringify(resp[0]));
            var user = new User(obj);
            user.exercise = [];
            var exercises = dt(obj.exercise, request.query.from, request.query.to, request.query.limit);
            exercises.forEach(element => { user.exercise.push(element); });
            response.json(user);
        });
};

function dt(ex, from, to, lim) {
    var exercises = [];
    var valid = false;
    for (var i = 0; i < ex.length; i++) {
        if (from != undefined && to != undefined) {
            valid = true;
            if (ex[i].date > new Date(from) && ex[i].date < new Date(to))
                exercises.push(ex[i]);
        } else if (from != undefined && to == undefined) {
            valid = true;
            if (new Date(ex[i].date) > new Date(from)) 
               exercises.push(ex[i]);
        } else if (to != undefined && from == undefined) {
            valid = true;
            if (ex[i].date < new Date(to))
                exercises.push(ex[i]);
        }
    }
    return exercises.length != 0 || valid ? limit(exercises, lim) : limit(ex, lim);
}

function limit(siftedWithDate, lim) {
    if (lim > 0) {
        return siftedWithDate.slice(0, lim);
    }
    return siftedWithDate;
}

module.exports = {
    users,
    createUser,
    createExercise,
    drawFields,
    findUser
};