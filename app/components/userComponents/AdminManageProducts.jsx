import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../reducers/products'
import {Link} from 'react-router'

export const ManageProducts = ({ fetchProducts, products}) => {
  console.log('ORDERS', products)
  return (
   <div className="AdminTableContainer">
    <h2>Manage Products</h2>
    <p><Link className="btn btn-default" to='/admin/addProduct'>Add a new product</Link></p>
    <table className="AdminTable table table-striped">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Edit product</th>
        </tr>
      </thead>
      <tbody>
   { products && products ? products.map(element => (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.name}</td>
        <td>{element.description}</td>
        <td>{element.price}</td>
        <td>{element.stock}</td>
            <td><Link to={`/admin/editProduct/${element.id}`}><span className="glyphicon glyphicon-pencil"></span></Link></td>
      </tr>
      )) : <p>You don't have permission to manage users</p>}
      </tbody>
    </table>
  </div>
  )
}

function MapDispatchToProps (dispatch) {
  return {
    fetchProducts: dispatch(fetchProducts())
  }
}

export default connect(
  state => ({products: state.products}),
MapDispatchToProps
)(ManageProducts)
