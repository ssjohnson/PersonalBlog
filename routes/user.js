var Post_Model = require('../models').Post;

exports.route = {
    get:
        function(req, res) {
            
            var userId = req.params.userId;
            
            var blogsPerPage = 1;
            
            var currentPage = parseInt(req.params.page);
            var previousPage;
            if(currentPage != 1) {
                previousPage = currentPage - 1;
            }
            var nextPage = currentPage + 1;
            Post_Model.count().then(function(count) {
                if (currentPage * blogsPerPage >= count) {
                    nextPage = undefined;
                }})
                .then( function() {    
                    Post_Model.findAll({
                        where: { UserId : userId },
                        order: [['id', 'DESC']],
                        limit: blogsPerPage,
                        offset: (currentPage-1) * blogsPerPage
                    })
                    .catch(function(error) {
                        throw error;
                        })
                    .then(function(results) {
                        if(results === null || results === undefined) {
                            res.render('blog', {title: 'Blog', username: req.session.username});
                        }
                        else {
                            res.render('user', {title: 'Blogs By '+ results.author, username: req.session.username, posts: results, page: currentPage, previousPage: previousPage, nextPage: nextPage});
                        }
                    });
                });
        }
}
            