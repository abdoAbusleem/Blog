const router = require("express").Router();
const {addComment , editComment , deleteComment} = require("../Controllers/comments")



router.post("/addComment" , addComment)


router.put("/editComment/:id" , editComment)

router.delete ("/deleteComment/:id" , deleteComment )

module.exports = router