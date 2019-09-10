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
        username: request.body.username
    });

    new_user.save((error, result) => {
        if (error)
            response.send(error);
        response.json(result);
    });
};


module.exports = {
    users,
    createUser
};