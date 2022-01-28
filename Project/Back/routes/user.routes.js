const router = require('express').Router()
const userController = require("../app/controller/user.controller")

const auth = require("../middlewares/auth")
const adminAuth = require("../middlewares/adminAuth")

//User
router.post("/register", userController.register)
router.get("/activate/:otp/:id", userController.activate)
router.post("/login", userController.login)
router.post("/logout", auth, userController.logOut)
router.get("/myprofile",auth, userController.myProfile)
router.delete("/profile/:id",auth, userController.deleteSingle)



//Admin
router.get("/admin/all",adminAuth,userController.showAll)
router.post("/admin/logout-all-users", adminAuth, userController.logoutAllUsers)
router.get("/admin/single-user-profile/:id",adminAuth, userController.showSingle)
router.delete("/admin/single-user-profile/:id",auth, userController.deleteSingle)


// // const upload = require("../middleware/uploadFile")
// const path=require("path")
// const fs = require("fs")

// router.post('/profile', auth,upload.single('image'), async function (req, res) {
//     fs.rename(req.file.path, `${req.file.path}${path.extname(req.file.originalname)}`, ()=>{})
//     req.user.img = `${req.file.path}${path.extname(req.file.originalname)}`
//     await req.user.save()
//     res.send(req.user)
// })
// const uploadWithStorage = require("../middleware/uploadWithStorage")
// router.post("/myProfile", auth, uploadWithStorage.single("image"), async(req,res)=>{
//     try{
//         req.user.img=req.file.path
//         await req.user.save()
//         res.send(req.user)

//     }
//     catch(e){
//         res.send(e)
//     }
// })


module.exports = router