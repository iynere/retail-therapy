import React from 'react'
import {Link, browserHistory} from 'react-router'

export default function AdminProfile ({user}) {
  return (
    <div className="Profile-Container">
      <div className="profile-title">
        <h3>Admin Page {user.name}</h3>
         {browserHistory.push(`/${user.name}`)}
      </div>
      <ul>
        <li><Link >Manage Users</Link></li>
        <li><Link >Manage Orders</Link></li>
        <li><Link >Manage Products</Link></li>
         <li><Link >Manage Categories</Link></li>
      </ul>
    </div>
  )
}
