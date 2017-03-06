import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  users: require('./users').default,
  auth: require('./auth').default,
  cart: require('./cart').default,
  products: require('./products').default,
  product: require('./product').default, //TATI: maybe there's a clearer name for this? what specifically is a product?
  reviews: require('./reviews').default 
})

export default rootReducer
