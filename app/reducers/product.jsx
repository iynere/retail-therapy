import axios from 'axios'

//---------------CONSTANTS---------------------------//
const PRODUCT = 'PRODUCT'


//--------------ACTION CREATORS----------------------//

const getProduct = product => ({type: PRODUCT, product})

//------------REDUCER-------------------------------//
const reducer = (state = {}, action) =>{
	switch(action.type){
	case PRODUCT:
		return action.product;
	}
	return state
}

//---------------THUNK------------------------------//

export const fetchProduct = productId =>
	dispatch =>
		axios.get(`/api/products/${productId}`)
			.then(product => dispatch(getProduct(product.data)))
			.catch((err)=>console.error(err))			 

export default reducer
