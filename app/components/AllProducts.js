import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {fetchProducts} from '../reducers/products'
import SearchProducts from './SearchProducts'

export function AllProducts (props) {
  const products = props.products;
  return(<div className="allProducts">
      <SearchProducts />
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
                    <button type="button" className="btn btn-default">
                      <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                      Add to cart
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
    fetchProducts: dispatch(fetchProducts())
  }
}

export default connect(MapSetToProps, MapDispatchToProps)(AllProducts)
