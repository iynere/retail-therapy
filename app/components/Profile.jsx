import React from 'react'
import {connect} from 'react-redux'
import UserProfile from './UserProfile'
import AdminProfile from './AdminProfile'

const Profile = ({user}) => {
  const userRole = user.role

  return (
    <div className="profile-page-container">
      <h2>Profile Page</h2>
      <div className="Profile-page-options">
        { userRole === 'basic' ? <UserProfile user={user} /> : null }
        { userRole === 'admin' ? <AdminProfile user={user}/> : null }
      </div>
    </div>
  )
}

export default connect(
  state => ({user: state.auth})
)(Profile)
