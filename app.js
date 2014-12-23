var express = require('express');
var app = express();
var body_parser = require('body-parser');
var http = require('http').Server(app);
var morgan = require('morgan');

//LOCAL FILES

var config = require('./configurations/config.js');
var routes = require('./routes/routes.js');


//DATABASE

var mysql = require('mysql');
var connection = require('express-myconnection');

app.use(connection(mysql, {
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
    }, 'request')
);

//PASSPORT 

var express_session = require('express-session');
var passport = require('passport');
var cookie_parser = require('cookie-parser');

app.use(express_session({
    secret: 'ABCDE',
    resave: false,
    saveUninitialized: true}));
app.use(cookie_parser('ABCDE'));
app.use(passport.initialize());
app.use(passport.session());

//VIEW ENGINE
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

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
