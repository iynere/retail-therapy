import React from 'react'
import {Link} from 'react-router'

export default function AdminProfile ({user}) {
  if (user && user.role === 'admin') {
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
  } else {
    return <h2>You don't have permission!</h2>
  }
}
