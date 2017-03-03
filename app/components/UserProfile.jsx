import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

export default function UserProfile ({options}) {
  return (
    <div className="Admin-Profile">
      <div className="Admin-profile-title">
        <h3>Admin Page</h3>
      </div>
      <ul>
        {(<li><Link >{options[0]}</Link></li>)}
        {
          options.map(element => (<li key={element}><Link >{element}</Link></li>))
        }

      </ul>
    </div>
  )
}
