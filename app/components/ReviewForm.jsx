import React from 'react'
import {connect} from 'react-redux'
import {addReview} from 'APP/app/reducers/reviews'

export const ReviewForm = props => {
	return (<div>
		<form onSubmit={evt => {
			evt.preventDefault()
			const review = {
				rating: evt.target.rating.value,
				text: evt.target.text.value,
				product_id: props.productId,
				user_id: props.currentUser.id
			}
			props.addReview(review, props.productId)
		}}>	
			<div>
			Rating 
				<select name="rating" required>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</div>
			<div>
				<textarea name="text" placeholder="Write your review here" required/>
			</div>
			<input type="submit" value="Submit Review" />
		</form>
	</div>)
}

const mapStateToProps = state => ({
	currentUser: state.auth
})

const mapDispatchToProps = dispatch => ({
	addReview: (review, productId) => {
		dispatch(addReview(review, productId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps
)(ReviewForm)
