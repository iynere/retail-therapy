import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

const Cart = ({cart}) => (
  <div>
    <h3>Cart</h3>
    <ul>
      {
        cart && cart.map(product => 
          <li key={product.id}><Link to={`/allProducts/${product.id}`}>{product.name}</Link>, quantity: 1{/* do quant later*/}, {product.price}</li>
        )
      }
    </ul>
  </div>
)

const mapStateToProps = state => ({
  cart: state.cart
})

// will need this when we have a plus, minus, etc, change quant thing in the cart itself
// const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps)(Cart)
