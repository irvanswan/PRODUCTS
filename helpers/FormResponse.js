const FormResponse = (message, res)=>{
    res.status(message ?. status ?? 200).send(message ?? {'message' : 'Not Exist', data :[]})
}

module.exports = FormResponse