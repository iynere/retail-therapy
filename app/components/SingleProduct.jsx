import React from 'react'
import {connect} from 'react-redux'
import ReviewForm from './ReviewForm'
import Reviews from './Reviews'
import {addToCart, addOneToQuantity} from '../reducers/cart'

export const SingleProduct = props => {
  const product = props.product || {},
    addToCart = props.addToCart,

    addOneToQuantity = props.addOneToQuantity,
    currentUser = props.user,
    cart = props.cart
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
                  currentUser ? 
                        (cart.some((item) => item.product_id === product.id) ? addOneToQuantity(product.id, currentUser.id) : addToCart(product.id, currentUser.id)) :
                        (cart.some((item) => item.id === product.id) ? addOneToQuantity(product.id, null) : addToCart(product.id, null))
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
  user: state.auth,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  addToCart: (productId, userId) => {
    dispatch(addToCart(productId, userId))
  },
  addOneToQuantity: (productId, userId) => {
    dispatch(addOneToQuantity(productId, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)