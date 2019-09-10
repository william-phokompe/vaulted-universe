
module.exports = function(app) {
    var logic = require('../app');

    app.route('/')
        .get(logic.drawFields);

    app.route('/listAllUsers')
        .get(logic.users);

    app.route('/api/exercise/new-user')
        .post(logic.createUser);

    app.route('/api/exercise/add')
        .post(logic.createExercise);
}