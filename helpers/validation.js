const joi = require("joi")
const { request } = require("express")



module.exports.validatePosts= async (data)=>{
        let schema = joi.object({
            title : joi.string().required().max(200),
            text : joi. string().required(),
            image : joi.required()

        })
     let {error} = await schema.validate(data)
     return error  
}



module.exports.validateRegister = async (data)=>{
    let schema = joi.object({
        name :joi.string().required(),
        email: joi.string().email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password :  joi.string().min(6).required(),
        image : joi.required()   
    })
    let {error} = await schema.validate(data)
    return error
}





module.exports.validateLogin = async (Request)=>{
    let schema = joi.object({
        email : joi.string().email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password : joi.string().required()
    })
    let {error} = await schema.validate(Request)
    return error
}

