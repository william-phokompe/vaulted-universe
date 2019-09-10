if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
require('./models/exercise');
require('./models/user');
var mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./control/routes'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.Promise = global.Promise;

mongoose.connect(
    `${process.env.EXERCISE_URI.toString()}&w=majority`,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
).then(_ => {
    app.listen(port);
}).then(_ => {
    console.log(`All is goo at: ${port}`);
}).catch((err) => {
    console.log(`What the heck? ${err}`);
});

routes(app);
