var mongoose = require('mongoose'),
    Exercise = require('./exercise');
mongoose.Schema.Types.Exercise = Exercise;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    exercise: {
        type: [Exercise],
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);