import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */
const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'
// const CREATE_REVIEW = 'CREATE_REVIEW'

/* ------------   ACTION CREATORS     ------------------ */

const receiveReviews = reviews => ({
	type: RECEIVE_REVIEWS,
	reviews: reviews
})

// don't store single reviews in store, just concat to reviews array
// const createReview = review => ({
// 	type: CREATE_REVIEW,
// 	review: review
// })

/* ------------       REDUCERS     ------------------ */

const reducer = (reviews = reviews || [], action) => {
	switch (action.type) {
		case RECEIVE_REVIEWS:
			return action.reviews
		default:
			return reviews
	}
}

//---------------THUNK------------------------------//

// 2 thunks for fetching reviews: 1 for including product, 1 for including review

export const fetchProductReviews = id => dispatch => {
	axios.get(`/api/reviews/products/${id}`)
		.then(res => dispatch(receiveReviews(res.data)))
		.catch(err => console.error('reviews fetch unsuccessful', err))
}

export const fetchUserReviews = id => dispatch => {
	axios.get(`/api/reviews/users/${id}`)
		.then(res => dispatch(receiveReviews(res.data)))
		.catch(err => console.error('reviews fetch unsuccessful', err))
}

export const addReview = (review, productId) => (dispatch, getState) => {
	axios.post(`/api/reviews/${productId}`, review)
		.then(res => res.data)
		.then(review => {
			const newReviewsArr = getState().reviews.concat([review]);
			dispatch(receiveReviews(newReviewsArr))
		})
		.catch(err => console.error('adding review unsuccessful', err))
}

export default reducer;