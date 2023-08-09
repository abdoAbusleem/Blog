const User = require("../models/user")
const { validateRegister, validateLogin } = require("../helpers/validation")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const { where } = require("sequelize")
const Post = require("../models/post")
const { Op } = require("sequelize")





module.exports.register = async (req, res) => {
    try {
        let error = await validateRegister({ ...req.body, image: req.file })
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        let existUser = await User.findOne({ where: { email: req.body.email } })
        if (existUser) {
            return res.send({ msg: "already regeisterd" })
        }

        let newUser = User.build({ id: res.locals.id, name: req.body.name, password: req.body.password, email: req.body.email, image: req.file?.filename })

        let saltRound = 10;
        let salt = await bcrypt.genSalt(saltRound)
        newUser.password = await bcrypt.hash(newUser.password, salt)

        await newUser.save()

        newUser.generateToken()

        let data = _.pick(newUser, ["name", "email", "image"])

        newUser.image = req.protocol + '://' + req.headers.host + '/images/' + newUser.image

        return res.status(200).header('access-token', newUser.token).send({ user: data, message: "thanks for register" })
    } catch (e) {
        return res.status(500).send(e.errors[0].message)
    }

}




module.exports.login = async (req, res) => {
    try {
        let error = await validateLogin(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        let loginUser = await User.findOne({ where: { email: req.body.email } })
        if (!loginUser) {
            return res.status(400).send("email or password is wrong")
        }

        let match = await bcrypt.compare(req.body.password, loginUser.password)
        if (!match) {
            return res.status(400).send("email or password is wrong")
        }



        loginUser.generateToken()

        let data = _.pick(loginUser, ["name", "email", "image"])
        return res.status(200).header("access-token", loginUser.token).send(data)
    } catch (e) {
        return res.status(500).send(e.errors[0].message)
    }
}


// get single user
module.exports.findUser = async (req, res) => {
    try {
        let findUser = await User.findOne({ where: { id: req.params.id }, attributes: ["name", "image"], include: { model: Post, attributes: ["title", "text", "image", "createdAt"] } })

        if (!findUser) {
            return res.status(400).send("user not found")
        }

        return res.status(200).send(findUser)
    } catch (e) {
        return res.status(500).send(e.errors[0].message)
    }
}



module.exports.upDate = async (req, res) => {
    try {
        await User.update({ ...req.body, image: req.file?.filename }, { where: { id: res.locals.userId } })

        let postData = await User.findOne({ where: { id: res.locals.userId } })

        postData.image = req.protocol + '://' + req.headers.host + '/images/' + postData.image

        return res.status(200).send(postData)
    } catch (e) {
        return res.status(500).send(e.errors[0].message)
    }
}





module.exports.findUsers = async (req, res) => {


    try {
        let findAllUsers = await User.findAll({ attributes: ["name", "image"], include: { model: Post, attributes: ["title", "text", "image", "createdAt"] } })

        if (findAllUsers.length == 0) {
            return res.status(400).send("not found")
        }

        return res.status(200).send(findAllUsers)
    } catch (e) {
        return res.status(500).send(e.errors[0].message)
    }
}




module.exports.deleteUser = async (req, res) => {
    try {
        let findUser = await User.findOne({ where: { id: res.locals.userId } })

        if (!findUser) {
            return res.status(400).send("please login before any operation")
        }

        let deleteUser = await User.destroy({ where: { id: res.locals.userId } })

        return res.status(200).send(findUser)

    } catch (e) {
        return res.status(500).send(e.errors[0].message)
    }
}






module.exports.searchUsers = async (req, res) => {

    try {

        let searchUsers = await User.findAll({
            where: {
                name: {
                    [Op.like]: "%" + req.params.name + "%"
                }
            },attributes : ["name" , "image"] , include : {model :Post , attributes : ["title" , "text" , "image" , "createdAt"]} }
        )

            if(searchUsers.length == 0) {
                return res.status(400).send("no users found")
            }
    
       return res.status(200).send(searchUsers)        
    } catch (e) {
        return res.status(500).send(e.errors[0].message)
    }
} 