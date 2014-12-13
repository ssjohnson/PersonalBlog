var express = require('express');
var app = express();
var body_parser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var routes = require('./routes/routes.js');

//DATABASE

var mysql = require('mysql');
var connection = require('express-myconnection');

app.use(connection(mysql, {
    host: 'sql5.freesqldatabase.com',
    database: 'sql561108',
    user: 'sql561108',
    password: 'aU9%eQ4!'
    }, 'single')
);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.use(body_parser.urlencoded({ extended: false }));

//ROUTES

app.get('/', routes.index);

app.get('/about', routes.about);

app.get('/contact', routes.contact);

app.get('/login', routes.login);

app.post('/sign_in', routes.sign_in);

app.get('/signup' , routes.signup);

app.post('/sign_up', routes.sign_up);


//START SERVER

http.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening at 3000');
});

//SOCKET.IO

io.on('connection', function(socket) {
    console.log('USER CONNECTED');
    socket.on('disconnect', function() {
        console.log('USER DISCONNECTED');
    });
});