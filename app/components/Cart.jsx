import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import {addOneToQuantity, removeOneFromQuantity, changeQuantity} from '../reducers/cart'

const Cart = ({cart, user, addOneToQuantity, removeOneFromQuantity, changeQuantity}) => (
	<div>
		<ul className="list-group cart-list">
			{
				user ? (cart.map(cartItem => 
					<li className="list-group-item" key={cartItem.id}>
						<div>
							<div>
								<Link to={`/allProducts/${cartItem.product.id}`}>
									{cartItem.product.name}
								</Link>
								<p>Price: {cartItem.product.price}</p>
							</div>
							<div>
							<p>Current quantity: {cartItem.quantity}</p>
							</div>
						</div>
						<div>
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
								<input className="form-control cart-quantity" name="quantity" placeholder="new quantity" />
								<button type="submit" className="btn btn-primary">Update Quantity</button>
							</form>
						</div>
					</li>)) : (cart.map(cartItem => 
						<li key={cartItem.id}>
							<Link to={`/allProducts/${cartItem.id}`}>{cartItem.name}</Link>, quantity: {cartItem.quantity}, {cartItem.price}
              <div>
                <button 
                  type="button" 
                  className="btn btn-default"
                  onClick={evt => {
                    evt.preventDefault()
                    addOneToQuantity(cartItem.id, null)
                  }}
                > +  
                </button>
                <button 
                  type="button" 
                  className="btn btn-default"
                  onClick={evt => {
                    evt.preventDefault()
                    removeOneFromQuantity(cartItem.id, null)
                  }}
                > - 
                </button>
                <form onSubmit={evt => {
                    evt.preventDefault()
                    changeQuantity(cartItem.id, null, evt.target.quantity.value)
                    evt.target.quantity.value = ''
                  }
                }>
                  <input className="form-control cart-quantity" name="quantity" placeholder="new quantity" />
                  <button type="submit" className="btn btn-primary">Update Quantity</button>
                </form>
              </div>
						</li>)
				)}
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
