const router = require('express').Router()
const brandController = require("../app/controller/brand.controller")

const adminAuth = require("../middlewares/adminAuth")
// const uploadFile = require("../middleware/uploadFile")


router.post("/add", adminAuth, brandController.add)
router.delete("/delete/:id",adminAuth, brandController.delete)
router.post("/edit/:id",adminAuth,brandController.edit)
router.get("/all/:id", brandController.showSingle)
router.get("/all", brandController.showAll)

module.exports = router