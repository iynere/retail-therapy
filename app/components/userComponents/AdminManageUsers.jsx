import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../reducers/users'

export const ManageUsers = ({user, fetchUsers, users}) => {
  console.log('USERS', users)
  return (
  <div>
    <h2>Manage Users</h2>
    { user && user ? users : <p>You don't have permission</p>}
  </div>
  )
}

function MapDispatchToProps (dispatch) {
  return {
    fetchUsers: dispatch(fetchUsers())
  }
}

export default connect(
  state => ({user: state.auth}),
MapDispatchToProps
)(ManageUsers)
