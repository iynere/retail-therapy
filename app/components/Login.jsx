import React from 'react'
import {browserHistory} from 'react-router'
import {login} from 'APP/app/reducers/auth'
import {combineCartItem} from 'APP/app/reducers/cart'
import {connect} from 'react-redux'

export const Login = props => (
	<div className="product-grid">
      <div className="product-card">
        <div className="col-md-2"></div>
        <div className="col-md-8 single-card">
          <div className="col-md-4 padding">
          <h3>Log in with your email</h3>
          <form className="form-group login-form" onSubmit={evt => {
      evt.preventDefault()
      // props.cart.forEach(cartItem => {
      //  props.combineCartItem(cartItem.product_id, props.user.id, cartItem.quantity)
      // })
      props.login(evt.target.username.value, evt.target.password.value)
      browserHistory.push('/')
    } }>
            <div className="form-group">
              <label for="username">Email</label>
              <input className="form-control" name="username" id="username" placeholder="example@example.com" required/>
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input className="form-control" name="password" type="password" id="password" placeholder="****" required/>
            </div>
            <button className="btn btn-default" type="submit">Login</button>
          </form>
          <p>Or:</p>
          <p><a className="btn btn-danger" href="/api/auth/google/login">Log in with Google</a></p>
          <p><a className="btn btn-primary" href="/api/auth/facebook/login">Log in with Facebook</a></p>
         </div>
        </div>
	 </div>
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
