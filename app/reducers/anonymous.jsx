import axios from 'axios'

//---------------CONSTANTS---------------------------//
const CREATE_ANONYMOUS = 'CREATE_ANONYMOUS_CART'


//--------------ACTION CREATORS----------------------//
const createAnonymousCart = cart => ({
	type: CREATE_ANONYMOUS,
	cart: cart
})

//------------REDUCER-------------------------------//
const reducer = (state = [], action) => {
	switch(action.type) {
		case CREATE_ANONYMOUS:
			return action.cart
	}

	return state
}