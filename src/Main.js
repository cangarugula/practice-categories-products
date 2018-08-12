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
                <hr />
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

  Products ({products}){
    return (
      <div>
        <div>
          <h3>Products</h3>
        </div>
        <div> {
          products.map(product => {
            return <ul>
              <li key={product.id}>{product.name}</li>
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
          <this.Products products={this.state.products} />
        </div>
      </div>

    )
  }
}
