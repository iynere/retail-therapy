import axios from 'axios'

//---------------CONSTANTS---------------------------//
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'


//--------------ACTION CREATORS----------------------//

const getProduct = products => ({type: GET_PRODUCT, products})
const  addNewProduct = products => ({type: ADD_PRODUCT})

//------------REDUCER-------------------------------//
const reducer = (state = {}, action) =>{
	switch(action.type){
	case GET_PRODUCT:
      return action.product;
    case ADD_PRODUCT:
      return state;
    default:
        return state;
	}
}

//---------------THUNK------------------------------//

export const fetchProduct = productId =>
	dispatch =>
		axios.get(`/api/products/${productId}`)
			.then(product => dispatch(getProduct(product.data)))
			.catch((err)=>console.error(err))

export const addProduct = (product) => (dispatch, getState) => {
	axios.post(`/api/products`, product)
		.then(res => res.data)
		.then(product => {
			const newProductsArr = getState().products.concat([product]);
			dispatch(addNewProduct(newProductsArr))
		})
		.catch(err => console.error('adding review unsuccessful', err))
}

export const editProduct = (product) => (dispatch, getState) => {
	axios.put(`/api/products/edit/${productId}`, product)
		.then(res => res.data)
		.catch(err => console.error('adding review unsuccessful', err))
}

export default reducer
