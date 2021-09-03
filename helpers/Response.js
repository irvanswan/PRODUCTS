const responseStatus = require('./responseStatus')

const res = new responseStatus();
const Response = {
    ServerError : (message) =>{
        return res.getResponse(message, 500)
    },
    CreateSuccess : (message = 201) => {
       return res.getResponse(message, 201)
    },
    isEmpty : (message ='Data is Empty') =>{
        return res.getResponse(message, 404)
    },
    badRequest : (message) =>{
        return res.getResponse(message, 400)
    }
}

module.exports = Response