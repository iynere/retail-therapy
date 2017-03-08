import React from 'react'
import {connect} from 'react-redux'

export const Complete = ({user, cart}) => (
  <div className="product-grid">
    <div className="product-card">
      <div className="col-md-8 single-card">
        <div className="col-md-6">
          <h3>Your order is complete</h3>
          <h2>Order number: {cart[0].order_id}</h2>
          <p className="product-desc">check your email for a confirmation</p>
        </div>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  user: state.auth,
  cart: state.cart
})

export default connect(mapStateToProps)(Complete)