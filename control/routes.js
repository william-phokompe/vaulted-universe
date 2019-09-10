
module.exports = function(app) {
    var logic = require('../app');

    app.route('/')
        .get(logic.users);

    app.route('/createUser')
        .post(logic.createUser);

    app.route('/createExercise')
        .post(logic.createExercise);
}