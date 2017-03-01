import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../reducers/product'

export const SingleProduct = props => {
	const product = props.product
	return(
		<div>
			<ul>
				<li>{product && product.name}</li>
				<li>{product && product.description}</li>
				<li>{product && product.categories}</li>
				<li>{product && product.price}</li>
				<li>{product && product.stock}</li>
				<li>{product && product.photoUrl}</li>
			</ul>
		</div>	
	)
}

const mapStateToProps = state => ({
	product: state.product
})

export default connect(mapStateToProps)(SingleProduct)