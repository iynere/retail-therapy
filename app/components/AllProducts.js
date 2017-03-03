import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchProducts } from '../reducers/products'
import {addProduct} from '../reducers/cart'

export const AllProducts = props => {
  const products = props.products || [],
    addProduct = props.addProduct 
  return (<div className="allProducts">
      <div className="product-grid">
        <div className="row">
          {products.map(product => (
              <div key={product.id} className="product-card col-sm-6 col-md-4">
                  <img src={product.photoUrl} className="product-img"/>
                  <div className="product-content">
                    <Link to={`/allProducts/${product.id}`}>
                    <h3>{product.name}</h3>
                    </Link>
                    <h2>{product.price}</h2>
                    <p className="product-desc">{product.description}</p>
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={evt => {
                        evt.preventDefault()
                        addProduct(product)
                      }}>
                      <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                      add to cart
                    </button>
                  </div>
              </div>
          ))}
        </div>
      </div>
    </div>)
}

function MapSetToProps (state) {
  return {
    products: state.products
  }
}

function MapDispatchToProps (dispatch) {
  return {
    fetchProducts: dispatch(fetchProducts()),
    addProduct: product => {
      dispatch(addProduct(product))
    }
  }
}

export default connect(MapSetToProps, MapDispatchToProps)(AllProducts)
