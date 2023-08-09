const { validatePosts } = require("../helpers/validation")
const User = require("../models/user")
const _ = require("lodash")
const Post = require("../models/post")
const { Op } = require("sequelize")





module.exports.create_Post = async (req, res) => {

    try {
        let error = await validatePosts({ ...req.body, image: req.file })
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        let newPost = await Post.create({ userId: res.locals.userId, title: req.body.title, text: req.body.text, image: req.file.filename })


        let existPost = await Post.findOne({ where: { title: req.body.title }, attributes: ["title", "text", "image", "createdAt"], include: { model: User, attributes: ["name"] } })
        newPost.image = req.protocol + '://' + req.headers.host + '/images/' + newPost.image

        return res.status(200).send(existPost)
    } catch (e) {
        return res.status(500).send(e.errors[0].message)
    }
}




module.exports.findPost = async (req, res) => {
    try {
        let findPost = await Post.findOne({ where: { id: req.params.id }, attributes: ["title", "text", "image", "createdAt"], include: { model: User, attributes: ["name"] } })
        if (!findPost) {
            return res.status(400).send("post is not found")
        }
        findPost.image = req.protocol + '://' + req.headers.host + '/images/' + findPost.image

        return res.status(200).send(findPost)
    } catch (e) {
        return res.status(500).send(e.errors[0].message)
    }
}






module.exports.findAllPosts = async (req, res) => {
    try {
           
        let offset = req.body.pageSize * req.body.pageNumber;
        let limit = req.body.pageSize

       
     let findAllPosts = await Post.findAndCountAll({limit : limit , offset :offset, attributes: ["title", "text", "image", "createdAt"], include: { model: User, attributes: ["name"]} })
        if (findAllPosts.length == 0) {
            return res.status(400).send("no posts found")
        }


        return res.status(200).send(findAllPosts)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}



module.exports.deletePost = async (req, res) => {
    try {
        let postExist = await Post.findOne({
            where: {
                id: req.params.id
            },
        })
        if (postExist.userId !== res.locals.userId) return res.status(401).send('unauthorized opertaion !!! ')

        if (!postExist) return res.status(400).send('Post Not Found')

        await Post.destroy({
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { userId: res.locals.userId }
                ]
            }
        })

        return res.status(200).send("Deleted successfully")
    } catch (e) {
        let error = Object.keys(e).length ? e : 'Post is not exist'
        return res.status(500).send(error)
    }
}



module.exports.editData = async (req, res) => {

    try {

        await Post.update({ ...req.body, image: req.file?.filename }, {
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { userId: res.locals.userId }
                ]
            }
        })

        let postData = await Post.findOne({
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { userId: res.locals.userId }
                ]
            }, attributes: ["title", "text", "image", "createdAt", "updatedAt"], include: { model: User, attributes: ["name"] }
        })

        if (!postData) {
            return res.status(400).send("no posts found")
        }

        postData.image = req.protocol + '://' + req.headers.host + '/images/' + postData.image

        return res.status(200).send(postData)
    }
    catch (e) {
        return res.status(500).send(e.errors[0].message)
    }
}



module.exports.searchPost = async (req, res) => {
    try {

        let searchPost = await Post.findAll({
            where: {
                title: {
                    [Op.like]: "%" + req.params.title + "%"
                }
            }, attributes: ["title", "text", "image", "createdAt"], include: { model: User, attributes: ["name"] }
        })

        if (searchPost.length == 0) {
            return res.status(400).send("no post not found")
        }

        searchPost.image = req.protocol + '://' + req.headers.host + '/images/' + searchPost.image


        return res.status(200).send(searchPost)

    } catch (e) {
        return res.status(500).send(e.errors[0].message)
    }
} 

