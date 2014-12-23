//USER MODEL

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true,                 allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false }, 
        firstname: { type: DataTypes.STRING, allowNull: false }, 
        lastname: { type: DataTypes.STRING, allowNull: false }
    });
    
    return User;
};