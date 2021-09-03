const productsRoute = require('./Products');

const app = (route, prefix)=>{
    route.use(`${prefix}/products`, productsRoute)
}

module.exports = app