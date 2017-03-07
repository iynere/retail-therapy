import React from 'react'
import {connect} from 'react-redux'

export const UserOrders = ({user, orders}) => {
  return (
   <div className="AdminTableContainer">
    <h2>Your Orders</h2>
    <table className="AdminTable table table-striped">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
   { orders && orders ? orders.map(order => (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.date}</td>
        <td>{order.status}</td>
        <td><button className="glyphicon glyphicon-eye-open"></button></td>
      </tr>
      )) : null}
      </tbody>
    </table>
  </div>
  )
}

export default connect(
  state => ({user: state.auth, orders: state.orders})
  )(UserOrders)
