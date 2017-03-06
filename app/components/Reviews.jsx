import React from 'react'
import {connect} from 'react-redux'

const Reviews = props => (
	<div>
		<ul className='reviews-list'>
			{
				props.reviews && props.reviews.map(review => {
					return(
                      <li key={review.id}>
                        <p className="nums">{review.rating}   stars - by {review.user.name || review.user.email}</p>
                        <p>{review.text}</p>
                        <p>date: {review.date}</p>
                      </li>
                    ) 
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
