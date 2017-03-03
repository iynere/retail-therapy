// CONSTANTS
const ADD_PRODUCT = 'ADD_PRODUCT'

// ACTION CREATORS
export const addProduct = product => ({
  type: ADD_PRODUCT,
  product: product 
})

const reducer = (state = state ? state : [], action) => {
  switch (action.type) {
    case ADD_PRODUCT:
    return state.concat([action.product])
  }
  return state;
}

// NO THUNKS, don't need to hit our backend (yet)

export default reducer