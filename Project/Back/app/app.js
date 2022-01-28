const express = require("express")
const app = express()
const cors = require('cors')

require("dotenv").config()
require("../models/db/connection")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/images', express.static('images'));

const userRoutes = require("../routes/user.routes")
const productRoutes = require("../routes/product.routes")
const categoryRoutes = require("../routes/category.routes")
const brandRoutes = require("../routes/brand.routes")


app.use("/user",userRoutes)
app.use('/product', productRoutes)
app.use('/category', categoryRoutes)
app.use('/brand', brandRoutes)


module.exports = app