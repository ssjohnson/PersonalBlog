var User_model = require('../models').User;

exports.route = {
    get: 
        function(req,res) { 
            res.render('confirm_delete', {title: 'Delete Account', user : req.session.user, username : req.session.username});
        },
    
    post: 
        function(req,res) { 
            User_model.find({ where: {username: req.session.username}})
            .then( function(results) {
                User_model.destroy( {where: {username: req.session.username}});
            })
            .complete( function() {
                res.redirect('/');
            });
        }
    
}