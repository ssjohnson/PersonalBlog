var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

exports.route = {
    get: 
        function (req,res) {
            console.log(req.session.username);
            res.render('signup', {title: 'Sign Up', username:req.session.username});
        },
    post:
        function(req,res) {     
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
        }
}