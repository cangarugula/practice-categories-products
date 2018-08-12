import React from 'react'
import axios from 'axios'

export default class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [],
      selectedCategory: {}
    }
    this.selected = this.selected.bind(this)
  }

  async componentDidMount(){
    try {
      let response = await axios.get('/api/categories')
      this.setState({
        categories: response.data
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
      categories.map(category => {
        return <ul>
            <li key={category.id} onClick={()=> selected(category.id)}>{category.name}: {category.products.length}</li>
            <hr />
            </ul>
      })
    )
  }

  Product ({category}) {
    const products = category.products
    return (
      <div>
        <div>
          <h3>{category.name}</h3>
        </div>
        <div> {
          products.map(product => {
            return <ul>
              <li>{product.name}</li>
              </ul>
          })}
        </div>
        <div>
          <a href='/'>Back</a>
        </div>
      </div>
    )

  }


  render() {

    return (
      <div id='app'>
        {this.state.selectedCategory.id ? <this.Product category={this.state.selectedCategory} /> : <this.Categories categories={this.state.categories} selected={this.selected}/>}
      </div>

    )
  }
}
