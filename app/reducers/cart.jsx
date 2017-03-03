// CONSTANTS
const ADD_PRODUCT = 'ADD_PRODUCT'

// ACTION CREATORS
export const addProduct = product => ({
  type: ADD_PRODUCT,
  product: product 
})

const dummyCart = [
  {
    id: 1,
    name: 'prod1',
    price: '$1.00'
  }, {
    id: 2,
    name: 'prod2',
    price: '$2.00'  
  }, {
    id: 3,
    name: 'prod3',
    price: '$3.00'  
  }
]

// REDUCERS
// first param: state = state.length ? state : []
const reducer = (state = dummyCart, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
    return state.concat([action.product])
  }
  return state;
}

// NO THUNKS, don't need to hit our backend (yet)

export default reducer