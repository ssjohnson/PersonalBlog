var body_parser = require('body-parser');

exports.index = function (req,res) {
    res.render('index', {title: 'Steve\'s Blog', type: 'Home'});
};

exports.about = function (req,res) {
    res.render('about', {title: 'Steve\'s Blog', type: 'About Me'});
};

exports.contact = function (req,res) {
    res.render('contact', {title: 'Steve\'s Blog', type: 'Contact Me', 
    email: 'ssjohnson1990@gmail.com', number:'9178437979'});
};

exports.login = function (req,res) {
    res.render('login', {title: 'Steve\'s Blog', type: 'Login'});
};

exports.signup = function (req,res) {
    res.render('signup', {title: 'Steve\'s Blog', type: 'Sign Up'});
};

exports.sign_in = function(req,res) {     
    var username = req.param('username');
    var password = req.param('password');
    console.log('UN: ' + username + ' - PW: ' + password);
        
    var values = [username, password];
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?',     
                         values, 
             function(err, results) {
                if (err) throw err;
                else console.log(results);
            }
        );
    });
                
    res.redirect('/');
};

exports.sign_up = function(req,res) {     
    var username = req.param('username');
    var password = req.param('password');
    var password_confirm = req.param('password-confirm');
    
    if(password === password_confirm) {
    
        console.log('UN: ' + username + ' - PW: ' + password);

        var values = [username, password];
        req.getConnection(function (err, connection) {
            connection.query('INSERT INTO users SET username = ?, password = ?', values, 
                 function(err, results) {
                    if (err) throw err;
                    else console.log(results);
                }
            );
        });

        res.redirect('/');
    }
    else {
        res.redirect('/about');
    }
};