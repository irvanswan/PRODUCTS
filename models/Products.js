const db = require('../helpers/Connection');
const Response = require('../helpers/Response')
const {ProductQuery} = require('../helpers/QueryBuilder');

const {deleteProduct, getAll, getByNameOrId, insert, update, getById} = ProductQuery
const {ServerError, isEmpty, CreateSuccess, badRequest} = Response

const Products = {
    getAllPorducts : (req) =>{
        return new Promise((resolve, reject)=>{
            db.query(getAll('name, stock, description, price, images, rating, seller'), (err, res)=>{
                if(!err){
                    if(res.rows.length < 1){
                       reject(isEmpty());
                    }
                    resolve({
                        message : `Success Get Data`,
                        status : 200,
                        data : res.rows
                    })
                }else{
                    reject(ServerError(`Failed Get Products ${err}`));
                }
            })
        })
    },
    getProductsById : (req)=>{
        return new Promise((resolve, reject)=>{
            db.query(getById(req.query.id,'name, stock, description, price, images, rating, seller'), (err, res)=>{
                if(!err){
                    if(res.rows.length < 1){
                       reject(isEmpty());
                    }
                    resolve({
                        message : `Success Get Data`,
                        status : 200,
                        data : res.rows
                    })
                }else{
                    reject(ServerError(`Failed Get Products ${err}`));
                }
            })
        })
    },
    searchProducts : (req)=>{
        const {key} = req.query
        return new Promise((resolve, reject)=>{
            if(!key){
                reject(badRequest('Field Cannot Empty'));
            }
            db.query(getByNameOrId(key,'name, stock, description, price, images, rating, seller'),(err, res)=>{
                if(!err){
                    if(res.rows.length < 1){
                        reject(isEmpty());
                    }
                    resolve({
                        message : `Success Get Data`,
                        status : 200,
                        data : res.rows
                    })
                }else{
                    reject(ServerError(`Failed Get Products ${err}`))
                }
            })
        })
    },
    insertProduct : (req)=>{
        return new Promise((resolve, reject)=>{
            const newBody = {
                id : req.body.id,
                name : (req.body.name) ? req.body.name : null,
                stock : (req.body.stock) ? req.body.stock : 0,
                description: req.body.description ? req.body.description : null,
                price: req.body.price ? req.body.price : 0,
                categories: req.body.categories ? req.body.categories : null,
                images: req.body.images ? req.body.images : null,
                weight:req.body.weight ? req.body.weight : 0,
                condition: req.body.condition ? req.body.condition : null,
                brand: req.body.brand ? req.body.brand : null,
                author: req.body.author ? req.body.author : null,
                rating: req.body.rating ? req.body.author : 0,
                seller: req.body.seller ? req.body.seller : null,
            }
            db.query(insert(newBody),(err, res)=>{
                if(!err){
                    resolve(CreateSuccess('Success Insert Data'));
                }else{
                    reject(ServerError(`Failed insert data ! ${insert(newBody)} : ${err}`));
                }
            })
        })
    },
    deleteProducts : (req)=>{
        return new Promise((resolve, reject)=>{
            db.query(getById(req.query.id, 'id'), (err, res)=>{
                if(!err){
                    if(res.rows.length < 1){
                        reject(isEmpty());
                    }
                    db.query(deleteProduct({id : req.query.id}), (error, result)=>{
                        if(!error){
                            resolve(CreateSuccess('success Delete Data'));
                        }
                        reject(ServerError(`Failed delete data ${error}`));
                    });
                }else{
                    reject(ServerError(`Failed get data ${err}`))
                }
            })
        })
    },
    updateProducts : (req)=>{
        return new Promise((resolve, reject)=>{
            db.query(getById(req.query.id, 'id'), (err, res)=>{
                if(!err){
                    if(res.rows.length < 1){
                        reject(isEmpty());
                    }
                    const newBody = {
                        id : req.query.id,
                        name : req.body.name ?? res.rows[0].name,
                        stock : req.body.stock ?? res.rows[0].stock,
                        description: req.body.description ?? res.rows[0].description,
                        price: req.body.price ?? res.rows[0].price,
                        categories: req.body.categories ?? res.rows[0].categories,
                        images: req.body.images ?? res.rows[0].images,
                        weight:req.body.weight ?? res.rows[0].weight,
                        condition: req.body.condition ?? res.rows[0].condition,
                        brand: req.body.brand ?? res.rows[0].brand,
                        author: req.body.author ?? res.rows[0].author,
                        rating: req.body.author ?? res.rows[0].rating,
                        seller: req.body.seller ?? res.rows[0].seller,
                    }
                    db.query(update(newBody), (error, result)=>{
                        if(!error){
                            resolve(CreateSuccess('Succes Update Products'));
                        }else{
                            reject(ServerError(`Failed update products with : ${error}`));
                        }
                    })
                }else{
                    reject(ServerError(`Error validation ${err}`));                   
                }
            })
        })
    }
}

module.exports = Products