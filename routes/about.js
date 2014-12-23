exports.route = {
    
    get: 
        function (req,res) {
            console.log(req.session.username);
            res.render('about', {title: 'About Me', username: req.session.username});
        }
};