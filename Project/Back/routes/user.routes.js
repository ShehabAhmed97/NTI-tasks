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
router.delete("/admin/single-user-profile/:id",adminAuth, userController.deleteSingle)

module.exports = router