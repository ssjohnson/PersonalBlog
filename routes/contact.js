exports.route = {
    get:    
        function (req,res) {
            console.log(req.session.username);
            res.render('contact', {title: 'Contact Me',                                                                      username:req.session.username, 
                                   data: {
                                       email: 'ssjohnson1990@gmail.com', 
                                       number:'9178437979'
                                        }
                                  }
                      );
        }
}