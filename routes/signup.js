
var User_Model = require('../models').User;
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var async = require('async');

exports.route = {
    
    get: 
        function (req,res) {
            console.log(req.session.username);
            res.render('signup', {title: 'Sign Up', username:req.session.username});
        },
    
    post:
        function(req,res, next) {     
            var username = req.param('username');
            var password = req.param('password');
            var firstname = req.param('firstname');
            var lastname = req.param('lastname');
            var password_confirm = req.param('password-confirm');
            
            console.log(req.param);
    
            if(password === password_confirm) {

                console.log('UN: ' + username + ' - PW: ' + password);

                var hash = bcrypt.hashSync(password, salt);
                
                var user = null;

                User_Model.create({ username: username, password: hash, firstname: firstname, lastname: lastname })
                    .then(
                        function(result) {
                            user = result;
                            console.log("*******************.create.complete***********");
                        }
                    )
                    .complete(
                        function() {
                            req.session.user = user;
                            req.session.username = username;
                            req.session.save();
                            console.log(req.session);
                            res.redirect('/userpage');
                        }
                    );
            }
            else {
                res.redirect('/about');
            }
        }
}