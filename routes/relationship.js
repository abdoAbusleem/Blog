const router = require("express").Router()
const { addFollow, findAllFollow , unFollow } = require("../Controllers/relationships")




router.post("/addFollow", addFollow)


router.get("/findAll", findAllFollow)

router.delete("/unFollow/:id" , unFollow)

module.exports = router