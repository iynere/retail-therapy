import React from 'react'
import {connect} from 'react-redux'
import UserProfile from './UserProfile'

const Profile = ({user}) => {

  const userRole = user.role

  return (
    <div className="profile-page-container">
      <h2>Profile Page</h2>
      <div className="Profile-page-options">
        { userRole === 'basic' ? <UserProfile options={['orders', 'reviews', 'information']} /> : <UserProfile options={['orders', 'users', 'categories', 'products']} /> }
      </div>
    </div>
  )
}

export default connect(
  state => ({user: state.auth})
)(Profile)
