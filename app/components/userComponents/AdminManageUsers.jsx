import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, UpdateUsrStatus, RemoveUser} from '../../reducers/users'

export const ManageUsers = ({user, fetchUsers, users, UpdateUserStatus, removeUser}) => {
  const onChange = function (event, id) {
    const role = event.target.value
    UpdateUserStatus(id, role)
  }

  const handleRemoveClick = (userId) => {
    console.log(userId)
    removeUser(userId)
  }

  if (user && user.role === 'admin') {
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
            <th>Options</th>
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
          <td><button className="glyphicon glyphicon-trash" onClick={ () => handleRemoveClick(element.id)}></button></td>
        </tr>
        )) : <p>You don't have permission to manage users</p>}
        </tbody>
      </table>
    </div>
    )
  } else {
    return <h2>You don't have permission!</h2>
  }
}

function MapDispatchToProps (dispatch) {
  return {
    fetchUsers: dispatch(fetchUsers()),
    UpdateUserStatus: (id, role) => dispatch(UpdateUsrStatus(id, role)),
    removeUser: (userId) => dispatch(RemoveUser(userId))
  }
}

export default connect(
  state => ({user: state.auth, users: state.users}),
MapDispatchToProps
)(ManageUsers)
