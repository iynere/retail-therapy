import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchProducts } from '../reducers/products'
import {addToCart} from '../reducers/cart'
import SearchProducts from './SearchProducts'

export const AllProducts = props => {
  const products = props.products || [],
    addToCart = props.addToCart,
    currentUser = props.user // still need to deal with adding products to cart if not logged in
  return (<div className="allProducts">
      <SearchProducts />
      <div className="product-grid">
        <div className="row">
          {products.map(product => (
              <div key={product.id} className="product-card col-md-3">
                <div className="card-padding">
                  <img src={product.photoUrl} className="product-img"/>
                  <div className="product-content">
                    <Link to={`/allProducts/${product.id}`}>
                    <h3>{product.name}</h3>
                    </Link>
                    <p className="product-desc">{product.description}</p>
                    <div className="price-add">
                      <h2 className="nums">{product.price}</h2>
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
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>)
}

function MapSetToProps (state) {
  return {
    products: state.products,
    user: state.auth
  }
}

function MapDispatchToProps (dispatch) {
  return {
    fetchProducts: dispatch(fetchProducts()),
    addToCart: (productId, userId) => {
      dispatch(addToCart(productId, userId))
    }
  }
}

export default connect(MapSetToProps, MapDispatchToProps)(AllProducts)
