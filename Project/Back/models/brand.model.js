const mongoose = require('mongoose')
const brandSchema = new mongoose.Schema({
    name:{type:String, required:true,unique:true, minlength:3, maxlength:20},
    img:{type:String},
    categories: [{catId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"}
    }]
},
{timestamps:true})

brandSchema.virtual("products", {
    localField: "_id",
    ref: "Product",
    foreignField: "brandId"
})

const brand = mongoose.model("Brand", brandSchema)
module.exports = brand