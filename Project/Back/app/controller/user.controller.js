const userModel = require("../../models/user.model")
const emailSender = require("../../helper/emailSender")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
            
class User {
    static register = async (req, res) => {
        try {
            let user = new userModel(req.body)
            await user.save()
            emailSender(user.email, `http://localhost:3000/user/activate/${user.otp}/${user._id}`)
            res.status(200).send({
                apiStatus: true,
                message: "Registerd successfuly"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding user data"
            })
        }
    }
    static activate = async(req,res)=>{
        try{
            let user = await userModel.findOne({otp:req.params.otp,_id:req.params.id})
            if(!user) throw new Error("not a user")
            user.isActivated=true
            user.otp=""
            await user.save()
            res.status(200).send("Activated successfully")
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }

    static login = async(req, res)=>{
        try{
            const user = await userModel.findOne({email:req.body.email})
            if(!user) throw new Error("Wrong Email")
            if(!user.isActivated) throw new Error("You have to activate your account to login")
            const isCorrect = await bcryptjs.compare(req.body.password,user.password)
            if(!isCorrect) throw new Error("wrong password")
            const token = jwt.sign({_id:user._id}, "123")
            user.tokens = user.tokens.concat({token})
            await user.save()
            res.status(200).send({apiStatus: true, data: {token}, message: "logged in"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"invalid data"})
        }
    }

    static logOut = async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(t=>{
                return t.token != req.token
            })
            await req.user.save()
            res.send({apiStatus:true, data: "Logged out"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message})
        }
    
    }

    static myProfile = async (req, res) => {
        try {
            const user = req.user
            let message= "data fetched successfuly"
            let mStatus = 200
            if(!user){ message="user not found"; mStatus=404 } 
            res.status(mStatus).send({
                apiStatus: true,
                data: user,
                message
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "Error fetching user's data"
            })
        }
    }


    static showSingle = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id)
            let message= "data fetched successfuly"
            let mStatus = 200
            if(!user){ message="user not found"; mStatus=404 } 
            res.status(mStatus).send({
                apiStatus: true,
                data: user,
                message
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "Error fetching user's data"
            })
        }
    }

    static deleteSingle = async (req, res) => {
        try{
            const user = await userModel.findByIdAndDelete(req.params.id)
            let message="deleted"
            let mStatus=200
            if(!user){message="user Not Found"; mStatus=404}
            res.status(mStatus).send({apiStatus:true,data,message:message})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"delete error"})
        }
    }


    static showAll = async (req, res) => {
        try {
            const users = await userModel.find()
            res.status(200).send({
                apiStatus: true,
                data: users,
                message: "Users' data fetched successfuly"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "Error fetching users' data"
            })
        }
    }

    static logoutAllUsers = async(req,res)=>{
        try{
            const users = await userModel.find()
            users.forEach(async (user) => {
                user.tokens = []
                await user.save()
            })
            res.send("All users have been logged out")
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e})
        }
    }

}
module.exports = User