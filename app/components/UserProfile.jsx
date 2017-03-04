import React from 'react'
import {Link, browserHistory} from 'react-router'

export default function UserProfile ({user}) {
  return (
    <div className="Admin-Profile">
      <div className="Admin-profile-title">
        <h3>Welcome {user.name}</h3>
        {browserHistory.push(`/${user.name}`)}
      </div>
      <ul>
        <li><Link to={'/accountInfo'}>Your Account Information</Link></li>
        <li><Link >Your Orders</Link></li>
        <li><Link >Your Wishlist</Link></li>
        <li><Link >Your Cart</Link></li>
      </ul>
    </div>
  )
}
