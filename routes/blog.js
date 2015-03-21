exports.route = {
    get: 
        function (req, res) {
            
            var posts = [];
            
            var Post_Model = require('../models').Post;
             
            Post_Model.findAll({
                order: [['id', 'DESC']],
                limit: 30
            }).success(function(results) {
                console.log(results);
                if(results === null || results === undefined) {
                    res.render('blog', {title: 'Blog', username: req.session.username});
                }
                else {
                    console.log("*****************/n" + results + "/n*******************");
                    for(var i = 0; i < results.length; i++) {
                        posts[i] = results[i];
                    }

                    res.render('blog', {title: 'Blog', username: req.session.username, posts: posts});
                }
            });
            
           
        }
}