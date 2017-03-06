import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders, updateStatus} from '../../reducers/orders'
var id, status

export const ManageOrders = ({user, fetchOrders, updateStatus, orders}) => {
  const statusArr = ['created', 'processing', 'cancelled', 'completed']
  const onChange = function(evt, id){
    status = evt.target.value
    id = id
    console.log('this is the select value & id', status, id)
    updateStatus(id, status)
  }
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
          <select onChange={(evt) => onChange(evt, element.id)}>
            <option value={element.status}>{element.status}</option>
            {statusArr.map( stat => {
                if(stat !== element.status){
                  return <option key={stat} value={stat}>{stat}</option>
                }
              })  
            }
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
  console.log('this is the select value & id', status, id)
  return {
    fetchOrders: dispatch(fetchOrders()),
    updateStatus: (id, status) => dispatch(updateStatus(id, status))
  }
}

export default connect(
  state => ({orders: state.orders}),
MapDispatchToProps
)(ManageOrders)
