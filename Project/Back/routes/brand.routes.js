const router = require('express').Router()
const brandController = require("../app/controller/brand.controller")

// const adminAuth = require("../middleware/adminAuth")
// const uploadFile = require("../middleware/uploadFile")


router.post("/add", brandController.add)
router.delete("/delete/:id", brandController.delete)
router.post("/edit/:id",brandController.edit)
router.get("/all/:id", brandController.showSingle)
router.get("/all", brandController.showAll)



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