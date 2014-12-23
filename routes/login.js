var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

exports.route = {
    get:
        function (req,res) {
            console.log(req.session.username);
            res.render('login', {title: 'Login', username:req.session.username});
        },
    
    post: 
        function(req,res) {     
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
                                        if(bcrypt.compareSync(password,                                                                 results[0].password)) 
                                        {
                                            console.log("MATCH: " + results);
                                            req.session.username = username;
                                            req.session.save();
                                            res.render('userpage', 
                                                       {title:'UserPage', 
                                                        username:req.session.username
                                                       }
                                                      );
                                        }
                                        else {
                                            console.log("NO MATCH");
                                            res.redirect('/');
                                        }
                                    }
                                });
            });
        }
}