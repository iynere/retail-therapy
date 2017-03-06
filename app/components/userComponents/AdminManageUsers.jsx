import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, UpdateUsrStatus} from '../../reducers/users'

export const ManageUsers = ({user, fetchUsers, users, UpdateUserStatus}) => {

  const onChange = function (event, id) {
    const role = event.target.value
    UpdateUserStatus(id, role)
  }

  return (
  <div className="AdminTableContainer">
    <h2>Manage Users</h2>
    <table className="AdminTable table table-striped">
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
        <td>
          <select className="custom-select select-padding" onChange={(event) => onChange(event, element.id)}>
            <option value={element.role}>{element.role}</option>
            <option>{element.role === 'admin' ? 'basic' : 'admin'}</option>
          </select>
          </td>
      </tr>
      )) : <p>You don't have permission to manage users</p>}
      </tbody>
    </table>
  </div>
  )
}

function MapDispatchToProps (dispatch) {
  return {
    fetchUsers: dispatch(fetchUsers()),
    UpdateUserStatus: (id, role) => dispatch(UpdateUsrStatus(id, role))
  }
}

export default connect(
  state => ({user: state.auth, users: state.users}),
MapDispatchToProps
)(ManageUsers)
