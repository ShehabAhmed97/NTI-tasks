const brandModel = require("../../models/brand.model")
            
class Brand {
    static add = async (req, res) => {
        try {
            let brand = new brandModel(req.body)
            await brand.save()
            res.status(200).send({
                apiStatus: true,
                data: brand,
                message: "data inserted successfuly"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding brand data"
            })
        }
    }
    static showAll = async (req, res) => {
        try {
            const brands = await brandModel.find()
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
            const brand = await brandModel.findById(req.params.id)
            let message= "data fetched successfuly"
            let mStatus = 200
            if(!brand){ message="brand not found"; mStatus=404 } 
            res.status(mStatus).send({
                apiStatus: true,
                data: brand,
                message
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error fetching brand data"
            })
        }

    }
    static delete = async (req, res) => {
        try{
            const brand = await brandModel.findByIdAndDelete(req.params.id)
            let message="deleted"
            let mStatus=200
            if(!brand){message="brand Not Found"; mStatus=404}
            res.status(mStatus).send({apiStatus:true,message:message})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"delete error"})
        }
    }

    static edit = async (req, res) => {
        try{
            const brand = await brandModel.findById(req.params.id)
            let message="Brand has been edited successfully"
            let mStatus=200

            if(!brand){message="brand Not Found"; mStatus=404}
            if(req.body.name){brand.name = req.body.name}
            if(req.body.logo){brand.logo = req.body.logo}

            await brand.save()
            res.status(mStatus).send({apiStatus:true,brand,message:message})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"Edit error"})
        }
    }

}
module.exports = Brand