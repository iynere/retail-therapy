import React from 'react'
import {Link, browserHistory} from 'react-router'

export default function UserProfile ({user}) {
  const currentUser = user && user ? user : ''
  return (
    <div className="Profile-Container">
      <div className="profile-title">
        <h3>Welcome {currentUser.name || currentUser.email}</h3>
      </div>
      <ul>
        <li><Link to={`/${user.id}/accountInfo`}>Your Account Information</Link></li>
        <li><Link to={`/${user.id}/orders`}>Your Orders</Link></li>
        <li><Link >Your Wishlist</Link></li>
        <li><Link to={`/${user.id}/cart`}>Your Cart</Link></li>
      </ul>
    </div>
  )
}
