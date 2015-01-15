//BLOG POST MODEL

module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
        id: { type: DataTypes.INTEGER, unique:true, autoIncrement: true, allowNull: false }, 
        title: { type: DataTypes.STRING },
        text: { type: DataTypes.TEXT },
        author: { type: DataTypes.STRING }
    });
    
    return Post;
};
        