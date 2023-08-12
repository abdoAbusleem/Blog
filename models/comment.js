const sequelize = require("../DBConfig/DBconnection")
const { DataTypes, Model } = require("sequelize")
const User = require("./user");
const Post = require("./post")


class comment extends Model { }

comment.init({
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

    text: {
        type: DataTypes.STRING,
        allowNull: false
    },

    userCommentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },

    post_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        }
    }

}, {
    sequelize,
    modelName: "comment",
})


User.hasMany(comment, {
    foreignKey: "userCommentId"
}, { onDelete: 'cascade', hooks: true });


Post.hasMany(comment, {
    foreignKey: "post_Id"
}, { onDelete: 'cascade', hooks: true });


comment.belongsTo(User)
comment.belongsTo(Post)

module.exports = comment
