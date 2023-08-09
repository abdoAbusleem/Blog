const RelationShip = require("../models/relationship")
const User = require("../models/user")





module.exports.addFollow = async (req,res)=>{

    try{


    let addFollow =  await RelationShip.create({followerUserId : res.locals.userId , followedUserId : req.body.followedUserId})

    return res.status(200).send(addFollow)
    
    }catch (e) {
        return res.status(500).send(e.message)
    }
    
}
