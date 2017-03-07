import axios from 'axios'

// CONSTANTS
const RECEIVE_ORDERS = 'RECEIVE_ORDERS'
const UPDATE_ORDERS = 'UPDATE_ORDERS'

// ACTION CREATORS
const receiveOrders = orders => ({
  type: RECEIVE_ORDERS,
  orders
})

const updateOrders = (id, status) => ({type: UPDATE_ORDERS})

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ORDERS:
      return action.orders

    case UPDATE_ORDERS:
      return state
  }
  return state
}

// THUNKS
export const fetchOrders = orders => dispatch => {
  axios.get('/api/orders')
       .then(res => dispatch(receiveOrders(res.data)))
       .catch(err => console.error(err))
}

export const updateStatus = (id, status) => dispatch => {
  axios.put('/api/orders', {id, status})
       .then(res => dispatch(updateOrders(id, status)))
       .catch(err => console.error(err))
}

export const fetchUserOrders = userId => dispatch => {
  axios.get(`/api/orders/${userId}`)
    .then(userOrders => dispatch(receiveOrders(userOrders.data)))
    .catch(console.error())
}

export default reducer
