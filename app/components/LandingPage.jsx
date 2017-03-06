// this is the page that will render initially; if the user is admin, then we want to redirect to the admin
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import AllProducts from './AllProducts'

export function LandingPage ({products, children}) {
  return (
    <div>
      {children}
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
