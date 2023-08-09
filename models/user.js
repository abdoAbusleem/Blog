const sequelize = require("../DBConfig/DBconnection")
const {DataTypes, Model} = require("sequelize")
const jwt = require("jsonwebtoken");



class user extends Model { 
    generateToken(){
        this.token = jwt.sign({ id: this.id }, 'secret');
    }}


user.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        noUpdate: {
            readOnly: true
        }
    },
    name :{
        type : DataTypes.STRING,
        allowNull : false,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull : false
    },
    image: {
        type: DataTypes.STRING,
    }
},{
    sequelize,
    modelName : "user"
})





module.exports = user 
