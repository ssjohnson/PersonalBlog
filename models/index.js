var Sequelize = require('sequelize'); 
var config = require('../configurations/config.js');

var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    omitNull: true
});

//AUTHENTICATE CONNECTION

sequelize.authenticate().complete(function(err) { 
    if(err){ throw err; }
    else {console.log("CONNECTION ESTABLISHED");}
});

var models = [
    'User', 
    'Post'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m) { 
    m.Post.belongsTo(m.User);
    m.User.hasMany(m.Post);
})(module.exports);

sequelize.sync({force:false});

module.exports.sequelize = sequelize;