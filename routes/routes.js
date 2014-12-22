var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

exports.index = function (req,res) {
    req.session.username = req.session.username || 'Anonoymous';
    req.session.save();
    res.render('index', {title: 'Home', username: req.session.username});
};

exports.about = function (req,res) {
    console.log(req.session.username);
    res.render('about', {title: 'About Me', username: req.session.username});
};

exports.contact = function (req,res) {
    
    console.log(req.session.username);
    res.render('contact', {title: 'Contact Me',                                                                      username:req.session.username, 
                           data: {
                               email: 'ssjohnson1990@gmail.com', 
                               number:'9178437979'
                                }
                          }
              );
};

exports.login = function (req,res) {
    
    console.log(req.session.username);
    res.render('login', {title: 'Login', username:req.session.username});
};

exports.signup = function (req,res) {
    
    console.log(req.session.username);
    res.render('signup', {title: 'Sign Up', username:req.session.username});
};

exports.sign_in = function(req,res) {     
    var username = req.param('username');
    var password = req.param('password');
    console.log('UN: ' + username + ' - PW: ' + password);
    
    var values = [username];
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM userlist WHERE username = ?',     
                         values, 
                         function(err, results) {
                            if (err) throw err;
                            if (results.length == 0) res.redirect('/');
                            else {
                                if(bcrypt.compareSync(password, results[0].password)) {
                                    console.log("MATCH: " + results);
                                    req.session.username = username;
                                    req.session.save();
                                    res.render('userpage', 
                                               {title:'UserPage', 
                                                username:req.session.username}
                                              );
                                }
                                else {
                                    console.log("NO MATCH");
                                    res.redirect('/');
                                }
                            }
                        });
    });
};

exports.sign_up = function(req,res) {     
    var username = req.param('username');
    var password = req.param('password');
    var firstname = req.param('firstname');
    var lastname = req.param('lastname');
    var password_confirm = req.param('password-confirm');
    
    if(password === password_confirm /* && check_user(username, req)*/) {
    
        console.log('UN: ' + username + ' - PW: ' + password);
        
        var hash = bcrypt.hashSync(password, salt);
        var values = [username, hash, firstname, lastname];
        req.getConnection(function (err, connection) {
            connection.query('INSERT INTO userlist SET username = ?, password = ?, firstname = ?, lastname = ?', 
                 values, 
                 function(err, results) {
                    if (err) throw err;
                    else console.log(results);
                }
            );
        });

        req.session.username = username;
        req.session.save();
        
        res.redirect('/userpage');
    }
    else {
        res.redirect('/about');
    }
};

exports.userpage = function(req,res) {
    res.render('userpage', {title:'UserPage', username:req.session.username});
};

exports.logout = function(req,res) {
    req.session.destroy();
    res.redirect('/');
};
                