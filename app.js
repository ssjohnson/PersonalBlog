var express = require('express');
var app = express();
var body_parser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = require('./database.js');
var mysql = require('mysql');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(body_parser.urlencoded({ extended: false }));

app.get('/', function (req,res) {
    res.render('index', {title: 'Steve\'s Blog', type: 'Home'});
});

app.get('/about', function (req,res) {
    res.render('about', {title: 'Steve\'s Blog', type: 'About Me'});
});

app.get('/contact', function (req,res) {
    res.render('contact', {title: 'Steve\'s Blog', type: 'Contact Me', 
    email: 'ssjohnson1990@gmail.com', number:'9178437979'});
});

app.get('/login', function (req,res) {
    res.render('login', {title: 'Steve\'s Blog', type: 'Login'});
});

app.post('/db_login', function(req,res) {
    var username = req.param('username');
    var password = req.param('password');
    console.log('UN: ' + username + ' - PW: ' + password);
    db.signUp(username, password);
    res.redirect('/');
});




http.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening at 3000');
});

io.on('connection', function(socket) {
    console.log('USER CONNECTED');
    socket.on('disconnect', function() {
        console.log('USER DISCONNECTED');
    });
});