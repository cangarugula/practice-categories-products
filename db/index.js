const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL,{logging: false})

const Product = db.define('product',{
  name: Sequelize.STRING
})

const Category = db.define('category',{
  name: Sequelize.STRING
})

Product.belongsTo(Category)
Category.hasMany(Product)

function syncAndSeed(){
db.sync({force:true})
  .then(async ()=> {
    let categories = ['Beverages','Canned Goods','Condiments','Paper Goods']
    let products = ['Capri Sun','Orange Juice','Canned Corn','Mustard','BBQ Sauce']
    let [beverages,cannedGoods,condiments,paperGoods] = await Promise.all(categories.map(category=>
      Category.create({name: category})))

    let [capriSun,orangeJuice,cannedCorn,mustard,bbqSauce] = await Promise.all(products.map(product => Product.create({name: product})))

    await Promise.all([
      capriSun.setCategory(beverages),
      orangeJuice.setCategory(beverages),
      cannedCorn.setCategory(cannedGoods),
      mustard.setCategory(condiments),
      bbqSauce.setCategory(condiments)
    ])
  })
  .then(()=> console.log('synced and seeded'))
}

module.exports = {Product,Category,syncAndSeed}
