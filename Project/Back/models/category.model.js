const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    name:{type:String, required:true,unique:true, minlength:2, maxlength:10},

},
{timestamps:true})

categorySchema.virtual("brands", {
    ref:"Brand",
    localField:"_id",
    foreignField:"categories.catId"
})

categorySchema.virtual("products", {
    localField: "_id",
    ref: "Product",
    foreignField: "categories.catId"
})


const category = mongoose.model("Category", categorySchema)
module.exports = category