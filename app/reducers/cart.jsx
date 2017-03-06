import axios from 'axios'

// CONSTANTS
const RECEIVE_CART = 'RECEIVE_CART'

// ACTION CREATORS
const receiveCart = cart => ({
	type: RECEIVE_CART,
	cart: cart
})

// REDUCER
const reducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CART:
      return action.cart
  }
  return state
}

// THUNKS
export const fetchCart = userId => dispatch => {
	axios.get(`/api/orders/${userId}/cart`)
		.then(res => dispatch(receiveCart(res.data)))
		.catch(err => console.error('fetching cart unsuccessful', err))
}

// lock in prices, change order status from 'cart' to 'processing'
// this only updates the backend, don't need to use the res.data at all
export const processCartForCheckout = userId => dispatch => {
	axios.put(`/api/orders/${userId}/checkout`)
		.catch(err => console.error('error processing cart for checkout', err))
}

export const lockInPriceForCheckout = (productId, userId) => {
	axios.put(`/api/orders/${productId}/${userId}/checkout`)
		.catch(err => console.error('error locking in item price for checkout', err))
}

// get the user's order for checkout
export const fetchOrderForCheckout = userId => dispatch => {
 axios.get(`/api/orders/${userId}/checkout`)
	 .then(res => dispatch(receiveCart(res.data)))
	 .catch(err => console.error('error fetching order for checkout', err))
}

// Adds a new item to the cart
export const addToCart = (productId, userId) => dispatch => {
	axios.post(`/api/orders/${productId}/${userId}`)
		.then(res => dispatch(fetchCart(userId)))
		.catch(err => console.error('adding to cart unsuccessful', err))
}

// Adds one to the quantity of an item already in the cart
export const addOneToQuantity = (productId, userId) => dispatch => {
	axios.put(`/api/orders/${productId}/${userId}/add`)
		.then(res => dispatch(fetchCart(userId)))
		.catch(err => console.error('updating cart unsuccessful', err))
}

export const removeOneFromQuantity = (productId, userId) => dispatch => {
	axios.put(`/api/orders/${productId}/${userId}/remove`)
		.then(res => dispatch(fetchCart(userId)))
		.catch(err => console.error('updating cart unsuccessful', err))
}

// Extrapolate this functionality to take care of adding and removing also
export const changeQuantity = (productId, userId, update) => dispatch => {
	axios.put(`/api/orders/${productId}/${userId}/${update}`)
		.then(res => dispatch(fetchCart(userId)))
		.catch(err => console.error('updating cart unsuccessful', err))
}

// not working right now
// export const combineCartItem = (productId, userId, quantity) => dispatch => {
//  console.log('combined cart item', productId)
//  axios.put(`/api/orders/${productId}/${userId}/add/${quantity}`)
//    .then(res => dispatch(fetchCart(userId)))
//    .catch(err => console.error('updating cart unsuccessful', err))   
// }

export default reducer
