const Comment =  require("../models/comment")
const Post = require("../models/post")
const User = require("../models/user")
const { Op } = require("sequelize")




module.exports.addComment = async(req,res)=>{
    try{

  
        let existComment = await Comment.findOne({where : {post_Id :req.body.post_Id}})

        if(!existComment){
            return res.status(400).send("post not found")
        }
       let addComment = await Comment.create({userCommentId : res.locals.userId , text : req.body.text , post_Id : req.body.post_Id})

    return res.status(200).send(addComment)

    }catch (e) {
        return res.status(500).send(e.message)
    }
}

 


module.exports.editComment = async (req,res)=>{
    try{   

     let dd =   await Comment.update(req.body,{
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { userCommentId: res.locals.userId }
                ]
            }
        })


      
        let getComment = await Comment.findOne({where : {[Op.and] : [
            {id : req.params.id},
            {userCommentId : res.locals.userId}
        ]}}) 


        if(!getComment){
            return res.status(400).send("not found")
        }

        return res.status(200).send(getComment)


    }catch (e) {
        return res.status(500).send(e.message)
    }
}



module.exports.deleteComment = async (req,res)=>{
     
    try{   
        
        let getFollowed = await Comment.findOne({where : {[Op.and] : [
            {id : req.params.id},
            {userCommentId : res.locals.userId}
        ]}}) 

        if(!getFollowed) {return res.status(400).send("not found")}


      await Comment.destroy({
        where: {
            [Op.and]: [
                { id: req.params.id },
                { userCommentId: res.locals.userId }
            ]
        }
    })

    return res.status(200).send("deleted succeeded")
 
    }catch (e) {
        return res.status(500).send(e.message)
    }
}



