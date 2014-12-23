var Sequelize = require('sequelize'); 
var config = require(__BASEDIR + '/configurations/config.js');

var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
});

//AUTHENTICATE CONNECTION

sequelize.authenticate().complete(function(err) { 
    if(err) throw err;
    else console.log("CONNECTION ESTABLISHED");
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

sequelize.sync({force:true}).complete(function (err) {
    if (err) throw err;
    else console.log("TABLES CREATED");
});

module.exports.sequelize = sequelize;
    