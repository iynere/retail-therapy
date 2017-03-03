import axios from 'axios'

//---------------CONSTANTS---------------------------//
const PRODUCT = 'PRODUCT'
const PRODUCT_SEARCH = 'PRODUCT_SEARCH'


//--------------ACTION CREATORS----------------------//

const getProduct = product => ({type: PRODUCT, product})

const getSearchResult = product => ({type: PRODUCT_SEARCH, product})

//------------REDUCER-------------------------------//
const reducer = (state = {}, action) =>{
	switch(action.type){
	case PRODUCT:
		return action.product;
    case PRODUCT_SEARCH:
		return action.product;
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

export const findProduct = productName =>
	dispatch =>
		axios.get(`/api/products/search/${productName}`)
			.then(product => dispatch(getSearchResult(product.data)))
			.catch((err)=>console.error(err))

export default reducer
