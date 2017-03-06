import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../reducers/cart'

export const ManageOrders = ({user, fetchOrders, orders}) => {
  return (
   <div className="AdminTableContainer">
    <h2>Manage Orders</h2>
    <table className="AdminTable">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
   { orders && orders ? orders.map(element => (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.date}</td>
        <td>
          <select>
            <option>{element.status}</option>
            <option>created</option>
            <option>processing</option>
            <option>cancelled</option>
            <option>completed</option>
          </select>
          </td>
        <td>{element.user_id}</td>
      </tr>
      )) : <p>You don't have permission to manage users</p>}
      </tbody>
    </table>
  </div>
  )
}

function MapDispatchToProps (dispatch) {
  return {
    fetchOrders: dispatch(fetchOrders())
  }
}

export default connect(
  state => ({orders: state.cart}),
MapDispatchToProps
)(ManageOrders)
