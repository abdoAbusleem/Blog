const sequelize = require("../DBConfig/DBconnection")
const { DataTypes, Model  } = require("sequelize")
const User = require("./user");
const user = require("./user");


class Relationship extends Model {}

Relationship.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    followerUserId:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id'
        }
    },
    followedUserId:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id'
        }
    }
},{
    sequelize,
    modelName: 'RelationShip' ,
    indexes: [{ unique: true, fields: ["followerUserId", "followedUserId"] }]
})


 User.hasMany(Relationship, {
      foreignKey: "followerUserId" ,
      foreignKey : 'followedUserId'
  }, { onDelete: 'cascade', hooks: true });




Relationship.belongsTo(User)




module.exports = Relationship