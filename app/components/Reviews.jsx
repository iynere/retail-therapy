import React from 'react'
import {connect} from 'react-redux'

const Reviews = props => (
	<div>
		<ul>
			{
				props.reviews && props.reviews.map(review => {
					return <li key={review.id}>{review.rating}, {review.text}, by {review.user.name}, date: {review.date}</li>
				})
			}
		</ul>
	</div>	
)


const mapStateToProps = state => ({
	reviews: state.reviews
})

export default connect(mapStateToProps)(Reviews)

// on single product page: each review needs to say who wrote it
// on single user page: each review needs to say what product it is
