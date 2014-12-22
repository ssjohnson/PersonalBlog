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

//ROUTES

app.get('/', routes.index);

app.get('/about', routes.about);

app.get('/contact', routes.contact);

app.get('/login', routes.login);

app.post('/login', routes.sign_in);

app.get('/signup' , routes.signup);

app.post('/sign_up', routes.sign_up);

app.get('/userpage', routes.userpage);

app.get('/logout', routes.logout);


//START SERVER

http.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening at 3000');
});
