const router = require("express").Router();
const {register , login ,findUser , upDate , findUsers , deleteUser , searchUsers} = require("../Controllers/users")
const {upload} = require('../middlewares/uploadFiles');
const {auth}    = require("../middlewares/auth") 






router.post("/add-User", upload.single('image'),register)

router.post("/login" ,login)

router.get ("/findUser/:id" , findUser)


router.get("/findAll" , auth , findUsers)

router.patch("/update", auth, upload.single('image') , upDate)

router.delete("/delete" , auth , deleteUser)

router.get ("/search/:name", auth , searchUsers)



module.exports = router         