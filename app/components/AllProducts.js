import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../reducers/products'

export function AllProducts (props) {
  const products = props.products;
  return(<div className="allProducts">
      {products.map(product => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </div>);
}

function MapSetToProps(state){
 return  {
   products: state.products
  }
}

const DispatchToProps =  function (dispatch) {
    return {
      onFetchProduct: function(){
        dispatch(fetchProducts())
      }
    }
}

export default connect (MapSetToProps, DispatchToProps)(AllProducts);





