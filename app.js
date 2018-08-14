const express = require('express')
const path = require('path')
const app = express()
const {Category,Product} = require('./db')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use('/dist',express.static(path.join(__dirname,'dist')))
app.get('/',(req,res,next)=> {
  res.sendFile(path.join(__dirname,'index.html'))
})


app.get('/api/products', async (req,res,next)=> {
  res.send(await Product.findAll({
    include: [ Category ]
  }))
})


app.get('/api/categories/:id',async (req,res,send) => {
  res.send(await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      Product
    ]
  }))
})

app.get('/api/categories', async (req,res,next)=> {
  res.send(await Category.findAll({include: [Product]}))
})

app.post('/api/add?item=:item&category=:category', async (req,res,next) => {
  try{

    console.log(req.query.item)
    res.redirect('/api/products')
    // await product.setCategory(req.query.category)
    await product.save()
  } catch (err) {
    console.log(err)
    throw(err)
  }
})

module.exports = app
