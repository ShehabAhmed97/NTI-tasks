const router = require('express').Router()
const categoryController = require("../app/controller/category.controller")
const categoryModel = require("../models/category.model")

// const adminAuth = require("../middleware/adminAuth")

router.post("/add", categoryController.add)
router.delete("/delete/:id", categoryController.delete)
router.post("/edit/:id",categoryController.edit)
router.get("/all/:id", categoryController.showSingle)
router.get("/all", categoryController.showAll)
router.get('/:id/brands', async(req,res)=>{
    let category = await categoryModel.findById(req.params.id)
    await category.populate("brands")
    res.send(category.brands)
})


module.exports = router