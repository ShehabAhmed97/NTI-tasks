const mongoose = require("mongoose")
const validator = require('validator')
const bcryptjs = require("bcryptjs")
const userSchema = new mongoose.Schema({
    role:{
        default:"customer",
        type:String
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    age:{
        type:Number,
        min:16,
        required:true
    },
    password:{
        type:String,
        minlength:6,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email format")
        }
    },
    isActivated:{
        type:Boolean,
        default:false
    },
    address:{
        type:String,
        required:true
    },
    tokens:[ {token:{type:String, required:true}} ],
    otp:{
        type:String,
        default:Date.now()
    },
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
       }
    ],
    pastOrders:[
        {
            date:{type: Date},
            details:[
                {
                    product:{
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: "Product"
                    },
                    quantity:{
                        type:Number
                    }
                }
            ]
        }
    ]
},
{timestamps:true}
)

//hiding user sensitive data in response
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.__v
    delete user.password
    delete user.tokens
    return user
}

//crypting user password before saving
userSchema.pre("save", async function(){
    const user = this
    if(user.isModified("password"))
        user.password = await bcryptjs.hash(user.password, 10)
})

const User = mongoose.model("User", userSchema)
module.exports = User


