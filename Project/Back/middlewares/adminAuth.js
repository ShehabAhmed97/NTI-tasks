const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const adminAuth = async (req,res,next)=>{
    try{
        const token = req.header("Authorization").replace("bearer ","")
        const decodedToken = jwt.verify(token,"123")
        const user = await userModel.findOne({_id:decodedToken._id,"tokens.token":token, role: "admin"})
        if(!user) throw Error("UNAUTHORIZED")
        req.user = user
        req.token = token
        next()    
    }catch(e){
        res.status(500).send({apiStatus: false, message: e.message})
    }
}

module.exports = adminAuth