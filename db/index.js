const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL)

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
  // .then(async ()=> {
  //   let categories = ['beverages','canned goods','condiments','paper goods']
  //   let products = ['capri suns','orange juice','canned corn','mustard','bbq sauce']

  //   let [beverages,cannedGood,condiments,paperGoods] = categories.map(category => await Promise.all([
  //     Category.create({name:category})
  //   ]))
  // })
}

module.exports = {Product,Category,syncAndSeed}
