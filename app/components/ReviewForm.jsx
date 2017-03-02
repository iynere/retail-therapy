import React from 'react'

export const ReviewForm = ({submitReview}) => (
	<div>
		<form onSubmit={evt => {
			evt.preventDefault()
			// Need to write submitReview reducer and action creator
			submitReview(evt.target.rating.value, evt.target.text.value)
			browserHistory.push('/')
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
	</div>
)

import {submitReview} from 'APP/app/reducers/review'
import {connect} from 'react-redux'

export default connect(
	state => ({}),
	{submitReview}
)(ReviewForm)