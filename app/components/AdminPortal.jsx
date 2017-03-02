import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

export default function AdminPortal (props) {
  return (
    <div className="Admin-Portal">
      <div className="Admin-options-pane">
      <ul>
        <li><Link >Orders</Link></li>
        <li><Link >Users</Link></li>
        <li><Link >Products</Link></li>
        <li><Link >Categories</Link></li>
        <li><Link >products</Link></li>
      </ul>
      </div>
    </div>
  )
}
