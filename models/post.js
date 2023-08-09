const sequelize = require("../DBConfig/DBconnection")
const { DataTypes, Model  } = require("sequelize")
const user = require("./user");


class Post extends Model { }

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        noUpdate: {
            readOnly: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: "Post",
    indexes: [{ unique: true, fields: ["title", "userId"] }]

})


user.hasMany(Post, {
    foreignKey: "userId"
}, { onDelete: 'cascade', hooks: true });

Post.belongsTo(user)

module.exports = Post   
