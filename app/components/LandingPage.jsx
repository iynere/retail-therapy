// this is the page that will render initially; if the user is admin, then we want to redirect to the admin
import React from 'react'
import {connect} from 'react-redux'
import AllProducts from './AllProducts'


export function LandingPage ({products, children}) {
  return (
    <div>
      <h1>Retail Therapy</h1>
      {children}
      <AllProducts products={products}/>
    </div>
  )
}

export default connect()(LandingPage)
