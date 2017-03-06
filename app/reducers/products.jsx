import axios from 'axios'

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
				 .catch((err) => console.error(err))
}

export default reducer
