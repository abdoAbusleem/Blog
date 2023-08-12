const RelationShip = require("../models/relationship")
const User = require("../models/user")
const { Op } = require("sequelize")






module.exports.addFollow = async (req, res) => {

    try {

        let findUser = await User.findOne({ where: { id: req.body.followedUserId } })

        if (!findUser) {
            return res.status(400).send("user not found")
        }

        if (res.locals.userId == req.body.followedUserId) {
            return res.status(400).send("can't do this")
        }

        let addFollow = await RelationShip.create({ followerUserId: res.locals.userId, followedUserId: req.body.followedUserId })




        return res.status(200).send(addFollow)

    } catch (e) {
        return res.status(500).send(e.message)
    }

}



module.exports.findAllFollow = async (req, res) => {
    try{
    let findAllFollow = await RelationShip.findAndCountAll({ where: { followerUserId: res.locals.userId }})
    if (!findAllFollow) {
        return res.status(400).send("not found followers")
    }

    return res.status(200).send(findAllFollow)
    }catch (e) {
    return res.status(500).send(e.message)
  }
}



module.exports.unFollow = async(req,res)=>{
  
    try{   

        let getFollowed = await RelationShip.findOne({where : {[Op.and] : [
            {id : req.params.id},
            {followerUserId : res.locals.userId}
        ]}}) 

        if(!getFollowed) {return res.status(400).send("follow thim")}


      await RelationShip.destroy({
        where: {
            [Op.and]: [
                { id: req.params.id },
                { followerUserId: res.locals.userId }
            ]
        }
    })

    return res.status(200).send("Unfollow succeeded")


    }catch (e) {
        return res.status(500).send(e.message)
    }
}