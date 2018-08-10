const express = require('express')
const {Category,Product,syncAndSeed} = require('./db')
const app = express()

const port = process.env.PORT || 3000

syncAndSeed()

app.listen(port, ()=> {console.log(`listening on port ${port}`)})
