const jwt = require("jsonwebtoken");


module.exports.auth = function(req, res, next){
    //check if login
if (!req.headers["access-token"]) {
     return res.status(401).send("please login before any operation")
 }
 else{
    try {
        const decoded = jwt.verify(req.headers["access-token"], 'secret');
        if(decoded){
            res.locals.userId = decoded.id
           return next()
        }
      } catch(err) {
        return res.status(401).send("you are not authorized to do any operation")
      }
 }
}
