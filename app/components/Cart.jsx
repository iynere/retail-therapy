import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import {addOneToQuantity, removeOneFromQuantity, changeQuantity} from '../reducers/cart'

const Cart = ({cart, user, addOneToQuantity, removeOneFromQuantity, changeQuantity}) => (
  <div>
    <ul>
      {
        user ? (cart.map(cartItem => 
          <li key={cartItem.id}>
            <Link to={`/allProducts/${cartItem.product.id}`}>
              {cartItem.product.name}
            </Link>, quantity: {cartItem.quantity}, {cartItem.product.price}, 
            <button 
              type="button" 
              className="btn btn-default"
              onClick={evt => {
                evt.preventDefault()
                addOneToQuantity(cartItem.product.id, user.id)
              }}
            > +  
            </button>
            <button 
              type="button" 
              className="btn btn-default"
              onClick={evt => {
                evt.preventDefault()
                removeOneFromQuantity(cartItem.product.id, user.id)
              }}
            > - 
            </button>
            <form onSubmit={evt => {
                evt.preventDefault()
                changeQuantity(cartItem.product.id, user.id, evt.target.quantity.value)
                evt.target.quantity.value = ''
              }
            }>
              <input name="quantity" placeholder="new quantity" />
              <input type="submit" value="Update Quantity" />
            </form>
          </li>)) : (cart.map(cartItem => 
            <Link to={`/allProducts/${cartItem.id}`}>
            <li key={cartItem.id}>
              {cartItem.name}, quantity: {cartItem.quantity}, {cartItem.price}
            </li>
            </Link>)
        )}
        {/*(cart.map(cartItem => 
          <li key={"Anonymous:", cartItem.id}>
            <Link to={`/allProducts/${cartItem.id}`}>
              {cartItem.name}
            </Link>, quantity: , {cartItem.price}
          </li>))*/} 
    </ul>
  </div>
)

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  addOneToQuantity: (productId, userId) => {
    dispatch(addOneToQuantity(productId, userId))
  },
  removeOneFromQuantity: (productId, userId) => {
    dispatch(removeOneFromQuantity(productId, userId))
  },
  changeQuantity: (productId, userId, quantity) => {
    dispatch(changeQuantity(productId, userId, quantity))
  },
  processCartForCheckout: userId => {
    dispatch(processCartForCheckout(userId))
  },
  lockInPriceForCheckout: (productId, userId) => {
    dispatch(lockInPriceForCheckout(productId, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
