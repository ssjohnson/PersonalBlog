

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

exports.db_login = function(db) {
    function(req,res) {
        var username = req.param('username');
        var password = req.param('password');
        console.log('UN: ' + username + ' - PW: ' + password);
        db.signUp(connection, username, password);
        res.redirect('/');
    }();
};