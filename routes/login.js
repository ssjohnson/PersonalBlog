var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var User_model = require('../models').User;

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
            var values = [username];
            
            console.log('UN: ' + username + ' - PW: ' + password);
            
            var user = User_model
                    .find({ where: { username: username } })
                    .catch( function(err) {
                        throw err; 
                        res.redirect('/');
                    })
                    .complete( function(err, result) {
                        if (err) { 
                            throw err;
                            res.redirect('/');
                        }
                        else {
                            console.log("USER: " + result.username);
                            if(bcrypt.compareSync(password, result.password)) {
                                console.log("MATCH: " + result);
                                req.session.user = result;
                                req.session.username = req.session.user.username;
                                req.session.save();
                                res.render('userpage', 
                                    { 
                                        title:'UserPage', 
                                        username:req.session.username,
                                        user: req.session.user  
                                    });
                            }
                            else 
                            {
                                console.log("NO MATCH");
                                res.redirect('/');
                            }
                        }
                    });
        }
}