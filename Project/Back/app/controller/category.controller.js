const categoryModel = require("../../models/category.model")
            
class Category {
    static add = async (req, res) => {
        try {
            let category = new categoryModel(req.body)
            await category.save()
            res.status(200).send({
                apiStatus: true,
                data: category,
                message: "data inserted successfuly"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding category data"
            })
        }
    }
    static showAll = async (req, res) => {
        try {
            const category = await categoryModel.find()
            res.status(200).send({
                apiStatus: true,
                data: category,
                message: "data fetched successfuly"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error fetching category data"
            })
        }
    }
    static showSingle = async (req, res) => {
        try {
            const category = await categoryModel.findById(req.params.id)
            let message= "data fetched successfuly"
            let mStatus = 200
            if(!category){ message="category not found"; mStatus=404 } 
            res.status(mStatus).send({
                apiStatus: true,
                data: category,
                message
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error fetching category data"
            })
        }

    }
    static delete = async (req, res) => {
        try{
            const category = await categoryModel.findByIdAndDelete(req.params.id)
            let message="deleted"
            let mStatus=200
            if(!category){message="category Not Found"; mStatus=404}
            res.status(mStatus).send({apiStatus:true,message:message})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"delete error"})
        }
    }

    static edit = async (req, res) => {
        try{
            const category = await categoryModel.findById(req.params.id)
            let message="Category has been edited successfully"
            let mStatus=200

            if(!category){message="category Not Found"; mStatus=404}
            if(req.body.name){category.name = req.body.name}

            await category.save()
            res.status(mStatus).send({apiStatus:true,category,message:message})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"Edit error"})
        }
    }

}
module.exports = Category