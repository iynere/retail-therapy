import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'

const Checkout = ({cart, user}) => (
  <div>
    <h3>Checkout</h3>
    <ul>
      {cart.every(cartItem => cartItem.product) && cart.map(cartItem => {
        return(
          <li key={cartItem.id}>
            <Link to={`/allProducts/${cartItem.product.id}`}>
              {cartItem.product.name}
            </Link>, quantity: {cartItem.quantity}, {cartItem.product.price}
          </li>
        )
      })}
    </ul>
    Your total: {`$${cart.reduce((total, cartItem) => (total + cartItem.price * cartItem.quantity), 0)/100}.00`}
  </div>
)

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  // 
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)