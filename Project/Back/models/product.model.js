const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name:{type:String, required:true,unique:true, minlength:2, maxlength:10},
    image:{type:String},
    categories: [{catId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"}
    }],
    brandId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Brand"
    },
    stock: {type:Number},
    price: {type: Number, required: true}
},
{timestamps:true})


const brand = mongoose.model("Product", productSchema)
module.exports = brand