global.__BASEDIR = __dirname + '/';

var express = require('express');
var app = express();
var body_parser = require('body-parser');
var http = require('http').Server(app);
var morgan = require('morgan');
var models = require('./models');

//LOCAL CONFIG FILES

var config = require('./configurations/config.js');

//DATABASE

var mysql = require('mysql');

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

//WILL LOG EVERY REQUEST SENT TO SERVER
app.use(morgan('dev'));

//BP TO GET DATA FROM POSTS
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

//ROUTER

var router = express.Router();

var routes = require('./routes');

router.get('/', routes.mainpage);

router.get('/blog', routes.blog.route.missingPageId);

router.get('/blog/:page', routes.blog.route.get);

router.get('/about', routes.about.route.get);

router.get('/contact', routes.contact.route.get);

router.get('/login', routes.login.route.get);

router.post('/login', routes.login.route.post);

router.get('/signup' , routes.signup.route.get);

router.post('/signup', routes.signup.route.post);

router.get('/userpage', routes.userpage.route.get);

router.get('/logout', routes.logout.route.get);

router.get('/newblog', routes.newblog.route.get);

router.post('/newblog', routes.newblog.route.post);

router.get('/user/:userId', routes.user.route.get);

router.get('/delete', routes.delete_account.route.get);

router.post('/delete', routes.delete_account.route.post);

app.use('/', router);

//START SERVER

http.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening at 3000');
});

exports.app = app;