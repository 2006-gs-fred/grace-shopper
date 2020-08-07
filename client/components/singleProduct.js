import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/shoppingCart'
class Product extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addItem({
      price: this.props.product.price * 100,
      quantity: 1,
      productId: this.props.product.id,
      orderId: 1
    })
  }
  render() {
    const product = this.props.product
    console.log(this.props.product)
    return (
      <div>
        <h1> Name: {product.name}</h1>
        <img src={product.imageUrl} />
        <h3> Price: {product.price}</h3>
        <p> Description: {product.description}</p>
        <label htmlFor="Quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          max="10"
          min="0"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          add to cart 🛒
        </button>
      </div>
    )
  }
}

const mapToState = state => ({
  product: state.product
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(fetchSingleProduct(id)),
  addItem: item => dispatch(addToCart(item))
})

export default connect(mapToState, mapDispatch)(Product)