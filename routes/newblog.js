exports.route = {
    get:
        function(req, res) {
            res.render('newblog', {title: 'New Blog', username: req.session.username});
        },
    
    post: 
        function (req,res) {
            console.log(req.param('blogTitle'));
            console.log(req.param('blogText'));
            console.log(req.session.user);
            
            var Post_Model = require('../models').Post;
            
            Post_Model.create({
                title: req.param('blogTitle'),
                text: req.param('blogText'),
                UserId: req.session.user.id,
                author: req.session.user.username
            }).success(function() {
                console.log("Successfully Added!");
            }).complete(function(){ 
                res.redirect('/blog');
            });
        }
}