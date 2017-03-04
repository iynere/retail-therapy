import axios from 'axios'

// CONSTANTS
const RECEIVE_CART = 'RECEIVE_CART'

// ACTION CREATORS
const receiveCart = cart => ({
  type: RECEIVE_CART,
  cart: cart
})


const reducer = (state = state ? state : [], action) => {
  switch (action.type) {
    case RECEIVE_CART:
    return action.cart

  }
  return state;
}

// THUNKS
export const fetchCart = userId => dispatch => {
  axios.get(`/api/orders/${userId}/cart`)
    .then(res => dispatch(receiveCart(res.data)))
    .catch(err => console.error('fetching cart unsuccessful', err))
}

// Adds a new item to the cart
export const addToCart = (productId, userId) => (dispatch, getState) => {
  axios.post(`/api/orders/${productId}/${userId}`)
    .then(res => fetchCart(userId))
    .catch(err => console.error('adding to cart unsuccessful', err))
}

// Adds one to the quantity of an item already in the cart
export const addOneToQuantity = (productId, userId) => (dispatch, getState) => {
  axios.put(`/api/orders/${productId}/${userId}/add`)
    .then(res => fetchCart(userId))
    .catch(err => console.error('updating cart unsuccessful', err))
}

export const removeOneFromQuantity = (productId, userId) => (dispatch, getState) => {
  axios.put(`/api/orders/${productId}/${userId}/remove`)
    .then(res => fetchCart(userId))
    .catch(err => console.error('updating cart unsuccessful', err))
}

// Extrapolate this functionality to take care of adding and removing also
export const changeQuantity = (productId, userId, update) => (dispatch, getState) => {
  axios.put(`/api/orders/${productId}/${userId}/${update}`)
    .then(res => fetchCart(userId))
    .catch(err => console.error('updating cart unsuccessful', err))
}

export default reducer