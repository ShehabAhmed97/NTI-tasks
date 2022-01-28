const router = require('express').Router()
const productController = require("../app/controller/product.controller")

const adminAuth = require("../middlewares/adminAuth")
const auth = require("../middlewares/auth")
const uploadFile = require("../middlewares/uploadFile")


router.post("/add", adminAuth,productController.add)
router.delete("/delete/:id",adminAuth, productController.delete)
router.post("/edit/:id",adminAuth,productController.edit)
router.get("/all/:id", productController.showSingle)
router.get("/all", productController.showAll)
router.get("/bycategory/:category", productController.showByCategory)
router.get("/bybrand/:brand", productController.showByBrand)
router.patch("/addtocart/:productid",auth,productController.addToCart)
router.post("/:id/addimage",adminAuth,uploadFile.single('image'),productController.addProductImage)


module.exports = router