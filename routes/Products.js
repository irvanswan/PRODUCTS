const route = require('express').Router()
const ProductsController = require('../controllers/Products');

route.get('/',ProductsController.getProducts);
route.delete('/delete', ProductsController.deleteProduct);
route.post('/add', ProductsController.addProducts);
route.patch('/update', ProductsController.updateProducts);

module.exports = route
