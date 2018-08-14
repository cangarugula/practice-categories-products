import React from 'react'
import axios from 'axios'

export default class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [],
      selectedCategory: {},
      products: []
    }
    this.selected = this.selected.bind(this)
    this.removeProduct = this.removeProduct.bind(this)
    this.addProduct = this.addProduct.bind(this)
  }

  async componentDidMount(){
    try {
      let _categories = await axios.get('/api/categories')
      let _products = await axios.get('/api/products')
      this.setState({
        categories: _categories.data,
        products: _products.data
      })
    } catch (err) { console.log(err)}
  }

  async selected(id) {
    try {
      let response = await axios.get(`/api/categories/${id}`)
      this.setState({
        selectedCategory: response.data
      })
    } catch (err) {console.log(err)}
  }

  Categories ({categories,selected}) {
    return (
      <div>
        <div>
          <h3>Categories</h3>
        </div>
        <div>{
          categories.map(category => {
            return <ul>
                <li key={category.id} onClick={()=> selected(category.id)}>{category.name}: {category.products.length}</li>
                </ul>
          })}
        </div>
      </div>
    )
  }

  SelectedCategory ({category}) {
    const products = category.products
    return (
      <div>
        <div>
          <h3>{category.name}</h3>
        </div>
        <div> {
          products.map(product => {
            return <ul>
              <li key={product.id}>{product.name}</li>
              </ul>
          })}
        </div>
        <div>
          <a href='/'>Back</a>
        </div>
      </div>
    )
  }

  removeProduct(id) {
    this.setState({
      products: this.state.products.filter(product => product.id !== id)
    })
  }

  async addProduct(item) {
    // try {
    //   let response = await axios.post(`/api/add?item=${item}&category=${category}`)
    //   console.log('this is response data', response.data)
    // } catch (err) {
    //   console.log(err)
    // }
    const product = [{name: item}]

    this.setState({
      products: this.state.products.concat(product)
    })
  }


  Products ({products,removeProduct}){
    return (
      <div>
        <div>
          <h3>Products</h3>
        </div>
        <div> {
          products.map(product => {
            return <ul>
                <li key={product.id}>{product.name}</li>
                <button onClick={()=> removeProduct(product.id)}>x</button>
              </ul>
          })}
        </div>
      </div>
    )
  }


  render() {

    return (
      <div id='app'>
        <div>
          {this.state.selectedCategory.id ? <this.SelectedCategory category={this.state.selectedCategory} /> : <this.Categories categories={this.state.categories} selected={this.selected}/>}
        </div>
        <div>
          <this.Products products={this.state.products} removeProduct={this.removeProduct} />
        </div>
        <div>
          <button onClick={()=> this.addProduct('Big Mac')}>Supersize Me</button>
        </div>
      </div>

    )
  }
}
