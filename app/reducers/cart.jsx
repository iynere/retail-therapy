import axios from 'axios'

// CONSTANTS
const RECEIVE_CART = 'RECEIVE_CART'

// ACTION CREATORS
const receiveCart = cart => ({
  type: RECEIVE_CART,
  cart: cart
})

// export const clearCart = () => ({
//   type: CLEAR_CART,
//   cart: []
// })

const reducer = (state = state ? state : [], action) => {
  switch (action.type) {
    case RECEIVE_CART:
    return action.cart
    // case CLEAR_CART:
    // console.log('cleared cart')
    // return action.cart
  }
  return state;
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

export default reducer