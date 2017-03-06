import axios from 'axios'

// CONSTANTS
const RECEIVE_CART = 'RECEIVE_CART'
const RECEIVE_ORDERS = 'RECEIVE_ORDERS'

// ACTION CREATORS
const receiveCart = cart => ({
  type: RECEIVE_CART,
  cart: cart
})

const receiveOrders = orders => ({
  type: RECEIVE_ORDERS,
  orders
})

// RECUDER
const reducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CART:
      return action.cart

    case RECEIVE_ORDERS:
      return action.orders
  }
  return state
}

// THUNKS
export const fetchCart = userId => dispatch => {
  axios.get(`/api/orders/${userId}/cart`)
    .then(res => dispatch(receiveCart(res.data)))
    .catch(err => console.error('fetching cart unsuccessful', err))
}

export const addToCart = (productId, userId) => (dispatch, getState) => {
  axios.post(`/api/orders/${productId}/${userId}`)
    .then(res => res.data)
    .then(newCartItem => {
      const newCart = getState().cart.concat([newCartItem])
      dispatch(receiveCart(newCart))
    })
    .catch(err => console.error('adding to cart unsuccessful', err))
}

export const fetchOrders = orders => dispatch => {
  axios.get('/api/orders')
       .then(res => dispatch(receiveOrders(res.data)))
       .catch(err => console.error(err))
}

export default reducer
