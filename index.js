const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const router = require('./routes')
require('dotenv').config()
require('newrelic');

const port = process.env.PORT ?? 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

router(app, '/api/products');
app.get('/api/products/', (req, res)=>{
    res.send('API PRODUCTS')
})

app.get('*', (req, res)=>{
    res.status(404).send({
        message: `Resource Not Found`,
        statusCode: 404,
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})