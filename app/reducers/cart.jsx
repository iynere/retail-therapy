import axios from 'axios'
import store from 'store'
// CONSTANTS
const RECEIVE_CART = 'RECEIVE_CART'

// ACTION CREATORS
const receiveCart = cart => ({
  type: RECEIVE_CART,
  cart: cart || []
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
  if (!userId) {
    var cart = store.get('cart')
    dispatch(receiveCart(cart))
  } else {
    axios.get(`/api/orders/${userId}/cart`)
      .then(res => {
        dispatch(receiveCart(res.data))})
      .catch(err => console.error('fetching cart unsuccessful', err))
  }
}

// lock in prices, change order status from 'cart' to 'processing'
// this only updates the backend, don't need to use the res.data at all
export const processCartForCheckout = orderId => dispatch => {
  axios.put(`/api/orders/${orderId}/checkout`)
    .then(res => console.log('cart ok'))
    .catch(err => console.error('error processing cart for checkout', err))
}

export const lockInPriceForCheckout = (orderId, productId) => {
  axios.put(`/api/orders/${orderId}/${productId}/checkout`)
    .then(res => console.log('price update ok'))
    .catch(err => console.error('error locking in item price for checkout', err))
}

// get the user's order for checkout
export const fetchOrderForCheckout = userId => dispatch => {
 axios.get(`/api/orders/${userId}/checkout`)
   .then(res => dispatch(receiveCart(res.data)))
   .catch(err => console.error('error fetching order for checkout', err))
}

export const completeOrder = userId => dispatch => {
  axios.put(`/api/orders/${userId}/complete`)
    .then(() => console.log('order is complete'))
    .catch(err => console.error('error completing order', err))
}

export const fetchCompletedOrder = (userId, orderId) => dispatch => {
  axios.get(`/api/orders/${userId}/${orderId}/complete`)
    .then(res => dispatch(receiveCart(res.data)))
    .catch(err => console.error('error fetching completed order', err))
}

// Adds a new item to the cart
export const addToCart = (productId, userId) => dispatch => {
  if (userId) {
    axios.post(`/api/orders/${productId}/${userId}`)
      .then(res => {
        dispatch(fetchCart(userId))})
      .catch(err => console.error('adding to cart unsuccessful', err))
  } else {
    axios.get(`/api/products/${productId}`)
      .then(res => res.data)
      .then(product => {
        if (localStorage.cart) {
          var newLocalCart = store.get('cart')
          newLocalCart.push(product)
          store.set('cart', newLocalCart)
        } else {
          store.set('cart', [product])
        }
      })
      .then(() => dispatch(fetchCart(null)))
      .catch(console.error)

    // Going to need an axios request here for the product, then add that to the cart
  }
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
