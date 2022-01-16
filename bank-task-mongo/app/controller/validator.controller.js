const validator = require("validator")
class ValiadtorController{
    static isEmptyString = (val)=>{
        return val.length 
    }

    static isPhoneNumber = (number)=>{
        return validator.isMobilePhone(number,['ar-EG'])
    }

}
module.exports = ValiadtorController