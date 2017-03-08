import React from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'

const Profile = ({user}) => {
  if (user && user.role === 'admin') {
    return (
      <div className="Profile-Container">
        <div className="profile-title">
          <h3>Admin {user.name}</h3>
        </div>
        <ul>
          <li><Link to={`/profile/${user.id}/manageUsers`}>Manage Users</Link></li>
          <li><Link to={`/profile/${user.id}/manageOrders`}>Manage Orders</Link></li>
          <li><Link to={`/profile/${user.id}/manageProducts`}>Manage Products</Link></li>
          <li><Link >Manage Categories</Link></li>
        </ul>
      </div>
    )
  } else if (user && user.role === 'basic') {
    return (
    <div className="Profile-Container">
      <div className="profile-title">
        <h3>Welcome {user.name || user.email}</h3>
      </div>
      <ul>
        <li><Link to={`/profile/${user.id}/accountInfo`}>Your Account Information</Link></li>
        <li><Link to={`/profile/${user.id}/orders`}>Your Orders</Link></li>
        <li><Link >Your Wishlist</Link></li>
        <li><Link to={`/profile/${user.id}/cart`}>Your Cart</Link></li>
      </ul>
    </div>
    )
  }
}

export default connect(
  state => ({user: state.auth})
)(Profile)


