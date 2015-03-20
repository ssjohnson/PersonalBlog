exports.route = {
    get:
        function(req, res) {
            var userId = req.params.userId;
            console.log(req.params);
            console.log(userId);
            
            var posts = [];
            
            var Post_Model = require('../models').Post;
            
            Post_Model.findAll({
                order:[['id', 'DESC']],
                limit: 10,
                where: {UserId: userId}
            }).success(function(results) {
                if(results === null || results === undefined) {
                    res.render('blog', {title: 'Blog', username: req.session.username});
                }
                else {
                    for(var i = 0; i < results.length; i++) {
                        posts[i] = results[i];
                    }
                res.render('user', {title:'User Page', username:req.session.username, posts: posts});
                }
            });
        }
}
            