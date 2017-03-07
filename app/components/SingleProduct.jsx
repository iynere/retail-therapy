import React from 'react'
import {connect} from 'react-redux'
import ReviewForm from './ReviewForm'
import Reviews from './Reviews'
import {addToCart} from '../reducers/cart'

export const SingleProduct = props => {
	const product = props.product || {},
    addToCart = props.addToCart,
    currentUser = props.user // still need to deal with adding products to cart if not logged in
	return(
      <div className="product-grid">
      <div className="product-card">
        <div className="col-md-2"></div>
          <div className="col-md-8 single-card">
          <div className="col-md-6">
              <img src={product.photoUrl} className="product-img"/>
              <div className="product-content">
                 <h3>{product.name}</h3> 
                <h2>{product.price}</h2>
                <p className="product-desc">{product.description}</p>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={evt => {
                    evt.preventDefault()
                    addToCart(product.id, currentUser.id)
                }}>
                  <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                  Add to cart
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="reviews">
                  <h3>Reviews</h3>
                  <Reviews />
                  <h3>Add a review</h3>
                  <ReviewForm productId={product.id}/>
              </div>
          </div>
          </div>
          <div className="col-md-2"></div>
      </div>
      </div>
  )
}

const mapStateToProps = state => ({
	product: state.product,
    user: state.auth
})

const mapDispatchToProps = dispatch => ({
  addToCart: (productId, userId) => {
    dispatch(addToCart(productId, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)