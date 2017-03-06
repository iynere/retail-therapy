import axios from 'axios'

//TATI: better verbiage in the action types
//TATI: handle errors with one function? - sometimes it's nice to have a way to track errors...

// ---------------CONSTANTS---------------------------//
const PRODUCTS = 'PRODUCTS'

// --------------ACTION CREATORS----------------------//

const getProducts = (products) => ({type: PRODUCTS, products})

// ------------REDUCER-------------------------------//
const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS:
      return action.products
  }
  return state
}

// ---------------THUNK------------------------------//

export const fetchProducts = () =>
  dispatch => {
    axios.get('/api/products')
         .then(products => dispatch(getProducts(products.data)))
         .catch((err)=>console.error(err)) //TATI: use console.error directly 
  }

export default reducer
