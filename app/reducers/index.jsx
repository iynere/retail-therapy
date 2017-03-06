import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  users: require('./users').default,
  auth: require('./auth').default,
  cart: require('./cart').default,
  products: require('./products').default,
  product: require('./product').default,
  reviews: require('./reviews').default
})

export default rootReducer
