exports.route = {
    get: 
        function (req, res) {
            res.render('blog', {title: 'Blog', username: req.session.username } );
        }
}