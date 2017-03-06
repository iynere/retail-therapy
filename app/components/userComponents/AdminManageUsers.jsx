import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../reducers/users'

export const ManageUsers = ({user, fetchUsers, users}) => {
  return (
  <div className="AdminTableContainer">
    <h2>Manage Users</h2>
    <table className="AdminTable">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Adress</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
   { users && users ? users.map(element => (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.name}</td>
        <td>{element.email}</td>
        <td>{element.address}</td>
        <td>{element.role}</td>
      </tr>
      )) : <p>You don't have permission to manage users</p>}
      </tbody>
    </table>
  </div>
  )
}

function MapDispatchToProps (dispatch) {
  return {
    fetchUsers: dispatch(fetchUsers())
  }
}

export default connect(
  state => ({user: state.auth, users: state.users}),
MapDispatchToProps
)(ManageUsers)
