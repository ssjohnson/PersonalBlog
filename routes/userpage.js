exports.route = {
    get:
        function (req,res) {
             res.render('userpage', {title:'UserPage', username:req.session.username});
        }
}