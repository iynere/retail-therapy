// this is the page that will render initially; if the user is admin, then we want to redirect to the admin
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import AdminPortal from './AdminPortal'
import AllProducts from './AllProducts'

export function LandingPage ({user, products}) {
  const userRole = user ? user.role : null
  return (
    <div>
      {userRole === 'admin' ? <AdminPortal /> : null }
      <AllProducts products={products}/>
    </div>
  )
}

function MapSetToProps (state) {
  return {
    user: state.auth
  }
}

export default connect(MapSetToProps)(LandingPage)
