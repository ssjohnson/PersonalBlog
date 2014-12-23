global.__BASEDIR = __dirname + '/';

var express = require('express');
var app = express();
var body_parser = require('body-parser');
var http = require('http').Server(app);
var morgan = require('morgan');

//LOCAL CONFIG FILES

var config = require('./configurations/config.js');

//DATABASE

var mysql = require('mysql');
/*
var connection = require('express-myconnection');

app.use(connection(mysql, {
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
    }, 'request')
);
*/

//SESSIONS

var express_session = require('express-session');
var cookie_parser = require('cookie-parser');

app.use(express_session({
    secret: 'ABCDE',
    resave: false,
    saveUninitialized: true}));
app.use(cookie_parser('ABCDE'));

//VIEW ENGINE & MODELS
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('models', require('./models'));

var User = app.get('models').User;

var user = User.build({ id: 19, username: "test@test", password: "test", firstName: "test", lastName: "test" });

user.save().complete(function (err) {
    if(err) throw err;
    else console.log("DATA SUCCESSFULLY INSERTED");
});


//WILL LOG EVERY REQUEST SENT TO SERVER
app.use(morgan('dev'));

//BP TO GET DATA FROM POSTS
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

//ROUTER

var router = express.Router();

var index = require('./routes/index.js');
var about = require('./routes/about.js');
var contact = require('./routes/contact.js');
var login = require('./routes/login.js');
var signup = require('./routes/signup.js');
var userpage = require('./routes/userpage.js');
var logout = require('./routes/logout.js');

router.get('/', index.route);

router.get('/about', about.route.get);

router.get('/contact', contact.route.get);

router.get('/login', login.route.get);

router.post('/login', login.route.post);

router.get('/signup' , signup.route.get);

router.post('/signup', signup.route.post);

router.get('/userpage', userpage.route.get);

router.get('/logout', logout.route.get);

app.use('/', router);

//START SERVER

http.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening at 3000');
});
