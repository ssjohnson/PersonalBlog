exports.route = function (req,res) {
    req.session.username = req.session.username || 'Anonoymous';
    //req.session.save();
    res.render('index', {title: 'Home', username: req.session.username});
};