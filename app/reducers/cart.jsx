import axios from 'axios'

// CONSTANTS
const RECEIVE_CART = 'RECEIVE_CART'
const RECEIVE_ORDERS = 'RECEIVE_ORDERS'

// ACTION CREATORS
const receiveCart = cart => ({
  type: RECEIVE_CART,
  cart: cart
})

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
export const combineCartItem = (productId, userId, quantity) => dispatch => {
  console.log('combined cart item', productId)
  axios.put(`/api/orders/${productId}/${userId}/add/${quantity}`)
    .then(res => dispatch(fetchCart(userId)))
    .catch(err => console.error('updating cart unsuccessful', err))   
}

export default reducer
