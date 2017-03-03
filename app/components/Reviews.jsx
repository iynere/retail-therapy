import React from 'react'
import {connect} from 'react-redux'

const Reviews = props => (
	<div>
		<ul>
			{
				props.reviews && props.reviews.map(review => {
					return <li key={review.id}>{review.rating}, {review.text}, by {review.user.name || review.user.email}, date: {review.date}</li>
				})
			}
		</ul>
	</div>	
)


const mapStateToProps = state => ({
	reviews: state.reviews
})

export default connect(mapStateToProps)(Reviews)

// still needs to get done
// on single user page: each review needs to say what product it is
