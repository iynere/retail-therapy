//this is the page that will render initially; if the user is admin, then we want to redirect to the admin
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import AdminPortal from './AdminPortal'
import AllProducts from './AllProducts'

export function LandingPage (props) {
  console.log('this is what landing page gets:', props)
  return(
    <div>
    {/*if user is admin*/}
    <AdminPortal />
    {/*else*/}
    <AllProducts products={props.products}/>
    </div>
  )
}

function MapSetToProps(state){
 return  {
   products: state.products
  }
}

export default connect (MapSetToProps)(LandingPage);