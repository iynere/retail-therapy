import React from 'react'
import {connect} from 'react-redux'
import ReviewForm from './ReviewForm'
import Reviews from './Reviews'
import {addProduct} from '../reducers/cart'

export const SingleProduct = props => {
	const product = props.product || {}
	return(
			<div className="product-grid">
				<div className="product-card col-sm-6 col-md-4">
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
                  props.addProduct(product)
              }}>
								<span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
							add to cart
							</button>
						</div>
						<div className="reviews">
							<ReviewForm productId={product.id}/>
							<h3>Reviews for {product.name}</h3>
							<Reviews />
						</div>
				</div>
			</div>
	)
}

const mapStateToProps = state => ({
	product: state.product
})

const mapDispatchToProps = dispatch => ({
  addProduct: product => {
    dispatch(addProduct(product))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)