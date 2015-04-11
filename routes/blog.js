var Post_Model = require('../models').Post;

exports.route = {
    get: 
        function (req, res) {
            var currentPage = parseInt(req.params.page);
            var previousPage;
            if(currentPage != 1) {
                previousPage = currentPage - 1;
            }
            var nextPage = currentPage + 1;
            Post_Model.findAll({
                order: [['id', 'DESC']],
                limit: 15,
                offset: (currentPage-1) * 15
            }).then(function(results) {
                if(results === null || results === undefined) {
                    res.render('blog', {title: 'Blog', username: req.session.username});
                }
                else {
                    console.log("Current: " + currentPage + "\n Previous: " + previousPage + "\n Next: " + nextPage);
                    res.render('blog', {title: 'Blog', username: req.session.username, posts: results, page: currentPage, previousPage: previousPage, nextPage: nextPage});
                }
            });
            
           
        }
}