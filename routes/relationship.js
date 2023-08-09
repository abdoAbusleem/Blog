const router = require ("express").Router()
const {addFollow} = require("../Controllers/relationships")




router.post("/addFollow" , addFollow)







module.exports = router