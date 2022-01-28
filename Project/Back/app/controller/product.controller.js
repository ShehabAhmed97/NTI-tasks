const productModel = require("../../models/product.model")
const path=require("path")
const fs = require("fs")
            
class Product {
    static add = async (req, res) => {
        try {
            let product = new productModel(req.body)
            await product.save()
            res.status(200).send({
                apiStatus: true,
                data: product,
                message: "data inserted successfuly"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding product data"
            })
        }
    }
    static showAll = async (req, res) => {
        try {
            const brands = await productModel.find()
            res.status(200).send({
                apiStatus: true,
                data: brands,
                message: "data fetched successfuly"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error fetching brands data"
            })
        }
    }
    static showSingle = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id)
            let message= "data fetched successfuly"
            let mStatus = 200
            if(!product){ message="product not found"; mStatus=404 } 
            res.status(mStatus).send({
                apiStatus: true,
                data: product,
                message
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error fetching product data"
            })
        }

    }

    static showByBrand = async (req,res)=>{
        const brandModel = require("../../models/brand.model")
        try{
            let brand = await brandModel.findById(req.params.brand)
            if(!brand) res.status(500).send({apiStatus:false, message:"No such brand"})
            await brand.populate("products")
            res.send(brand.products)    
        }catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"fetching error"})
        }
    }

    static showByCategory = async (req,res)=>{
        const categoryModel = require("../../models/category.model")
        try{
            let category = await categoryModel.findById(req.params.category)
            if(!category) res.status(500).send({apiStatus:false, message:"No such category"})
            await category.populate("products")
            res.send(category.products)    
        }catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"fetching error"})
        }
    }

    static delete = async (req, res) => {
        try{
            const product = await productModel.findByIdAndDelete(req.params.id)
            let message="deleted"
            let mStatus=200
            if(!product){message="product Not Found"; mStatus=404}
            res.status(mStatus).send({apiStatus:true,message:message})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"delete error"})
        }
    }

    static edit = async (req, res) => {
        try{
            const product = await productModel.findById(req.params.id)
            let message="Product has been edited successfully"
            let mStatus=200

            if(!product){message="product Not Found"; mStatus=404}
            if(req.body.name){product.name = req.body.name}
            if(req.body.logo){product.logo = req.body.logo}

            await product.save()
            res.status(mStatus).send({apiStatus:true,product,message:message})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"Edit error"})
        }
    }

    static addToCart = async (req, res) => {
        try{
            const user = req.user
            if(user.cart){
                user.cart.push(req.params.productid)
            }else{
                user.cart = []
                user.cart.push(req.params.productid)
            }
            
            await user.save()
            let message="Product has been added to your cart successfully"
            let mStatus=200
                
            res.status(mStatus).send({apiStatus:true,cart:user.cart,message:message})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"Error adding this item"})
        }
    }

    static addProductImage = async (req,res) => {
        try{
            fs.rename(req.file.path, `${req.file.path}${path.extname(req.file.originalname)}`, ()=>{})
            const product = await productModel.findById(req.params.id)
            product.image = `${req.file.path}${path.extname(req.file.originalname)}`
            await product.save()
            res.send({apiStatus:true,data:product.image,message:"Image has been added successfully"})
        
        }catch(e){
            res.send({apiStatus:false,data:e.message,message:"Error adding image.."})
        }
    }

}
module.exports = Product