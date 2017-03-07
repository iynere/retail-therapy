import axios from 'axios'

//---------------CONSTANTS---------------------------//
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

//--------------ACTION CREATORS----------------------//

const getProduct = product => ({type: GET_PRODUCT, product})
const  addNewProduct = products => ({type: ADD_PRODUCT})

//------------REDUCER-------------------------------//
const reducer = (state = {}, action) =>{
	switch(action.type){
	case GET_PRODUCT:
      return action.product
    case ADD_PRODUCT:
      return state
    default:
        return state
	}
}

//---------------THUNK------------------------------//

export const fetchProduct = productId =>
	dispatch =>
		axios.get(`/api/products/${productId}`)
			.then(product => dispatch(getProduct(product.data)))
			.catch((err)=>console.error(err))

export const addProduct = (product) => dispatch => {
	axios.post(`/api/products`, product)
		.then()
		.catch(err => console.error('adding review unsuccessful', err))
}

export const editProduct = (product, id) => dispatch => {
    console.log('on editProduct thunk, product and id are:', product, id)
	axios.put(`/api/products/edit/${id}`, product)
		 .then(updated => dispatch(getProduct(updated.data)))
		 .catch(err => console.error('adding review unsuccessful', err))
}

export const deleteProduct = (id) => dispatch => {
	axios.delete(`/api/products/delete/${id}`)
		 .then()
         .catch(err => console.error('adding review unsuccessful', err))
}

export default reducer
