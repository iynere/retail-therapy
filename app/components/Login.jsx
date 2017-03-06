import React from 'react'
import {browserHistory} from 'react-router'
import {login} from 'APP/app/reducers/auth'
import {combineCartItem} from 'APP/app/reducers/cart'
import {connect} from 'react-redux'

export const Login = props => (
  <div>
    <form onSubmit={evt => {
      evt.preventDefault()
      // props.cart.forEach(cartItem => {
      //  props.combineCartItem(cartItem.product_id, props.user.id, cartItem.quantity)
      // })
      props.login(evt.target.username.value, evt.target.password.value)
      browserHistory.push('/')
    } }>
      <input name="username" required/>
      <input name="password" type="password" required/>
      <input type="submit" value="Login" />
    </form>
    <p><a href="/api/auth/google/login">log in with Google</a></p>
    <p><a href="/api/auth/facebook/login">log in with Facebook</a></p>
  </div>
)

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    dispatch(login(username, password))
  },
  combineCartItem: (productId, userId, quantity) => {
    dispatch(combineCartItem(productId, userId, quantity))
  }
})

export default connect (mapStateToProps, mapDispatchToProps)(Login)
