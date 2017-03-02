import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

export default function AdminPortal (props) {
  return(
    <div className="admin">
      <ul>
        <li><Link >orders</Link></li>
        <li><Link >users</Link></li>
        <li><Link >products</Link></li>
      </ul>
    </div>
  )
}