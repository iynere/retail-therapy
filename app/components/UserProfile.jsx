import React from 'react'
import {Link, browserHistory} from 'react-router'

export default function UserProfile ({user}) {
  if (user && user.role === 'admin') {
    browserHistory.push('/admin')
    return (
      <div className="Profile-Container">
        <div className="profile-title">
          <h3>Admin Page {user.name}</h3>
        </div>
        <ul>
          <li><Link to={'/admin/manageUsers'}>Manage Users</Link></li>
          <li><Link to={'/admin/manageOrders'}>Manage Orders</Link></li>
          <li><Link to={'/admin/manageProducts'}>Manage Products</Link></li>
          <li><Link >Manage Categories</Link></li>
        </ul>
      </div>
    )
  } else if (user.role === 'basic') {
    browserHistory.push('/user')
    return (
    <div className="Profile-Container">
      <div className="profile-title">
        <h3>Welcome {user.name || user.email}</h3>
      </div>
      <ul>
        <li><Link to={`/${user.id}/accountInfo`}>Your Account Information</Link></li>
        <li><Link to={`/${user.id}/orders`}>Your Orders</Link></li>
        <li><Link >Your Wishlist</Link></li>
        <li><Link to={`/${user.id}/cart`}>Your Cart</Link></li>
      </ul>
    </div>
    )
  } else {
    return <h2>You don't have permission!</h2>
  }
}
