const router = require("express").Router();
const {create_Post , findPost , findAllPosts , deletePost ,  editData , searchPost} = require("../Controllers/posts")
const {upload} = require('../middlewares/uploadFiles');





router.post("/createPost", upload.single('image'), create_Post)


router.get("/findPost/:id" , findPost)


router.post("/findAll" , findAllPosts)


router.delete("/delete/:id" , deletePost)



router.patch("/editData/:id" , upload.single("image") , editData )



router.get("/search/:title" , searchPost)

module.exports = router 




