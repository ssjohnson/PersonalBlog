exports.mainpage = function (req,res) {
    req.session.username = req.session.username || 'Anonoymous';
    res.render('index', {title: 'Home', username: req.session.username});
};

exports.about = require('./about.js');
exports.contact = require('./contact.js');
exports.login = require('./login.js');
exports.signup = require('./signup.js');
exports.userpage = require('./userpage.js');
exports.logout = require('./logout.js');
exports.blog = require('./blog.js');
exports.newblog = require('./newblog.js');
exports.user = require('./user.js');
exports.delete_account = require('./deleteaccount.js');