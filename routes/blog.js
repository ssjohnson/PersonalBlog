exports.route = {
    get: 
        function (req, res) {
            
            var posts = [];
            console.log(posts.length);
            
            var Post_Model = require('../models').Post;
            
            Post_Model.findAll({
                limit: 10
            }).then(function(results) {
                console.log("*****************/n" + results + "/n*******************");
                for(var i = 0; i < results.length; i++) {
                    posts[i] = results[i];
                }
                
                console.log(posts[0].text);
                res.render('blog', {title: 'Blog', username: req.session.username, posts: posts  } );
            });
            
           
        }
}