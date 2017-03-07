import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import {completeOrder} from '../reducers/cart'

class Checkout extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      billingAddress: {
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      },
      shippingAddress: {
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      }
    }
    
    this.handleBillingChangeName = this.handleBillingChangeName.bind(this)
    this.handleBillingChangeAddr1 = this.handleBillingChangeAddr1.bind(this)
    this.handleBillingChangeAddr2 = this.handleBillingChangeAddr2.bind(this)
    this.handleBillingChangeCity = this.handleBillingChangeCity.bind(this)
    this.handleBillingChangeState = this.handleBillingChangeState.bind(this)
    this.handleBillingChangeZip = this.handleBillingChangeZip.bind(this)
    this.handleShippingChangeName = this.handleShippingChangeName.bind(this)
    this.handleShippingChangeAddr1 = this.handleShippingChangeAddr1.bind(this)
    this.handleShippingChangeAddr2 = this.handleShippingChangeAddr2.bind(this)
    this.handleShippingChangeCity = this.handleShippingChangeCity.bind(this)
    this.handleShippingChangeState = this.handleShippingChangeState.bind(this)
    this.handleShippingChangeZip = this.handleShippingChangeZip.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleBillingChangeName(evt) {
    this.setState({
      billingAddress: {
        name: evt.target.value
      }
    })
  }
  
  handleBillingChangeAddr1(evt) {
    this.setState({
      billingAddress: {
        address1: evt.target.value
      }
    })
  }
  
  handleBillingChangeAddr2(evt) {
    this.setState({
      billingAddress: {
        address2: evt.target.value
      }
    })
  }
  
  handleBillingChangeCity(evt) {
    this.setState({
      billingAddress: {
        city: evt.target.value
      }
    })
  }
  
  handleBillingChangeState(evt) {
    this.setState({
      billingAddress: {
        state: evt.target.value
      }
    })
  }
  
  handleBillingChangeZip(evt) {
    this.setState({
      billingAddress: {
        zip: evt.target.value
      }
    })
  }
  
  handleShippingChangeName(evt) {
    this.setState({
      shippingAddress: {
        name: evt.target.value
      }
    })
  }
  
  handleShippingChangeAddr1(evt) {
    this.setState({
      shippingAddress: {
        address1: evt.target.value
      }
    })
  }
  
  handleShippingChangeAddr2(evt) {
    this.setState({
      shippingAddress: {
        address2: evt.target.value
      }
    })
  }
  
  handleShippingChangeCity(evt) {
    this.setState({
      shippingAddress: {
        city: evt.target.value
      }
    })
  }
  
  handleShippingChangeState(evt) {
    this.setState({
      shippingAddress: {
        state: evt.target.value
      }
    })
  }
  
  handleShippingChangeZip(evt) {
    this.setState({
      shippingAddress: {
        zip: evt.target.value
      }
    })
  }
  
  handleSubmit(evt) {
    evt.preventDefault()
    console.log('testing')
    this.props.completeOrder(this.props.user.id)
    this.setState({
      billingAddress: {
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      },
      shippingAddress: {
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      }
    })
    browserHistory.push(`/${this.props.userId}/complete`)
  }
  
  render() {
    return (
      <div>
        <div>
          <h3>Checkout</h3>
          <ul>
            {this.props.cart.every(cartItem => cartItem.product) && this.props.cart.map(cartItem => {
              return(
                <li key={cartItem.id}>
                  <Link to={`/allProducts/${cartItem.product.id}`}>
                    {cartItem.product.name}
                  </Link>, quantity: {cartItem.quantity}, {cartItem.product.price}
                </li>
              )
            })}
          </ul>
          Your total: {`$${this.props.cart.reduce((total, cartItem) => (total + cartItem.price * cartItem.quantity), 0)/100}.00`}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <h3>Billing Information</h3>
            <label htmlFor="name">Name</label>
            <input
            className="form-control"
            name="name"
            id="name"
            placeholder="your name here"
            required
            onChange={this.handleBillingChangeName}
            value={this.state.billingAddress.name}
            />
            <label htmlFor="address1">Address Line 1</label>
            <input
            className="form-control"
            name="address1"
            id="address1"
            placeholder="Street Address..."
            required
            onChange={this.handleBillingChangeAddr1}
            value={this.state.billingAddress.address1}
            />
            <label htmlFor="address2">Address Line 2</label>
            <input
            className="form-control"
            name="address2"
            id="address2"
            placeholder="Apartment number, etc."
            onChange={this.handleBillingChangeAddr2}
            value={this.state.billingAddress.address2}
            />
            <label htmlFor="city">City</label>
            <input
            className="form-control"
            name="city"
            id="city"
            placeholder="Example City"
            required
            onChange={this.handleBillingChangeCity}
            value={this.state.billingAddress.city}
            />
            <label htmlFor="state">State</label>
            <input
            className="form-control"
            name="state"
            id="state"
            placeholder="Your State"
            required
            onChange={this.handleBillingChangeState}
            value={this.state.billingAddress.state}
            />
            <label htmlFor="zip">ZIP Code</label>
            <input
            className="form-control"
            name="zip" id="zip"
            placeholder="12345"
            onChange={this.handleBillingChangeZip}
            value={this.state.billingAddress.zip}
            />
          </div>
          <div className="form-group">
            <h3>Shipping Information</h3>
            <label htmlFor="name">Name</label>
            <input
            className="form-control"
            name="name"
            id="name"
            placeholder="your name here"
            required
            onChange={this.handleShippingChangeName}
            value={this.state.shippingAddress.name}
            />
            <label htmlFor="address1">Address Line 1</label>
            <input
            className="form-control"
            name="address1"
            id="address1"
            placeholder="Street Address..."
            required
            onChange={this.handleShippingChangeAddr1}
            value={this.state.shippingAddress.address1}
            />
            <label htmlFor="address2">Address Line 2</label>
            <input
            className="form-control"
            name="address2"
            id="address2"
            placeholder="Apartment number, etc."
            onChange={this.handleShippingChangeAddr2}
            value={this.state.shippingAddress.address2}
            />
            <label htmlFor="city">City</label>
            <input
            className="form-control"
            name="city"
            id="city"
            placeholder="Example City"
            required
            onChange={this.handleShippingChangeCity}
            value={this.state.shippingAddress.city}
            />
            <label htmlFor="state">State</label>
            <input
            className="form-control"
            name="state"
            id="state"
            placeholder="Your State"
            required
            onChange={this.handleShippingChangeState}
            value={this.state.shippingAddress.state}
            />
            <label htmlFor="zip">ZIP Code</label>
            <input
            className="form-control"
            name="zip" id="zip"
            placeholder="12345"
            onChange={this.handleShippingChangeZip}
            value={this.state.shippingAddress.zip}
            />
          </div>
          <input type="submit" value="Complete your order" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  completeOrder: userId => {
    dispatch(completeOrder(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)