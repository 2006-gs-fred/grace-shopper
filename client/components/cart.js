import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    return (
      <div>
        <h1>Cart</h1>
      </div>
    )
  }
}

export default connect(null)(Cart)