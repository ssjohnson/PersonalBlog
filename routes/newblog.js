exports.route = {
    get:
        function(req, res) {
            res.render('newblog', {title: 'New Blog', username: req.session.username});
        }
}