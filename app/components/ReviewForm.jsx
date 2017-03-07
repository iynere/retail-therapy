import React from 'react'
import {connect} from 'react-redux'
import {addReview} from 'APP/app/reducers/reviews'

export const ReviewForm = props => {
  return (<div>
    <form className='form-group' onSubmit={evt => {
      evt.preventDefault()
      const review = {
        rating: evt.target.rating.value,
        text: evt.target.text.value,
        product_id: props.productId,
        user_id: props.currentUser.id
      }
      props.addReview(review, props.productId)
      evt.target.rating.value = 1
      evt.target.text.value = ''
    }}> 
      <div>
      Rating 
        <select className="custom-select rating" name="rating" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
          <textarea className="form-control review-area" name="text" placeholder="Write your review here" required/>
          <button type="submit" className="btn btn-default">Submit Review</button>
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
