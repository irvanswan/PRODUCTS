const productsModel = require('../models/Products');
const FormResponse = require('../helpers/FormResponse')

const Products = {
    getProducts : async (req, res)=>{
        if(!req.query.id && !req.query.name){
            await productsModel.getAllPorducts().then((result)=>{
                FormResponse(result, res);
            }).catch((err)=>{
                FormResponse(error, res);
            })
        }else if(req.query.id != null){
            await productsModel.getProductsById(req).then((result)=>{
                FormResponse(result, res)
            }).catch((error)=>{
                FormResponse(error, res)
            })
        }
        await productsModel.searchProducts(req).then((result)=>{
            FormResponse(result, res)
        }).catch((error)=>{
            FormResponse(error, res)
        })
    },
    addProducts : async(req, res)=>{
        await productsModel.insertProduct(req).then((result)=>{
            FormResponse(result, res);
        }).catch((error)=>{
            FormResponse(error, res);
        })
    },
    updateProducts : async(req, res)=>{
        await productsModel.updateProducts(req).then((result)=>{
            FormResponse(result, res);
        }).catch((error)=>{
            FormResponse(error, res);
        })
    },
    deleteProduct : async(req, res)=>{
        await productsModel.deleteProducts(req).then((result)=>{
            FormResponse(result, res);
        }).catch((error)=>{
            FormResponse(error, res);
        })
    }
}

module.exports = Products