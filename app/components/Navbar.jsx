import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import {logout} from '../reducers/auth'
import {fetchCart, /*clearCart,*/ receiveCart} from '../reducers/cart'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.renderLoginSignup = this.renderLoginSignup.bind(this)
    this.renderLogout = this.renderLogout.bind(this)
    this.renderCart = this.renderCart.bind(this)
  }

  // componentDidUpdate() {
  //   console.log(this.props)
  //   const currentUser = this.props.currentUser
  //   console.log(currentUser)
  //   return currentUser ? fetchCart(currentUser.id) : null
  // }

  render () {
  // need to include user in redux store / state
    const currentUser = this.props.currentUser,
      cartSize = this.props.cart.length
    
    return (
      <nav className="navbar navbar-toggleable-md">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target=".navbar-collapse">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link to="/" className="navbar-brand">Retail Therapy</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto no-padding">
              {currentUser && currentUser.role !== 'anonymous' ? this.renderUser() : this.renderLoginSignup()}
            </ul>
            <ul className="navbar-nav mr-auto navbar-right">
              
              <li className="nav-item" id="cart_icon">
                {this.renderCart()}
                {/*currentUser ? this.renderCart() : 
                <Link><span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> (empty!)</Link>
                */}
              </li>
             {currentUser ? this.renderLogout() : null}
            </ul>
          </div>
      </nav>
    )
  }
  
  renderCart() {
    const currentUser = this.props.currentUser, 
    // [ {quantity: 1} , {quantity: 2} ]
      cartSize = this.props.cart && this.props.cart.reduce((result, cartItem) => {
        return result + cartItem.quantity
      }, 0)

    let userOrVisitor

    if (currentUser) {
      userOrVisitor = currentUser.id
    } else {
      userOrVisitor = "visitor"
    }

    return(
      <Link to={`/${userOrVisitor}/cart`}>
        <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>{cartSize ? cartSize === 1 ? ' (1 item)' : ` (${cartSize} items)` : ' (empty!)'}
      </Link>
    )
  }
  
  renderLoginSignup () {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
         <Link to="/signup" activeClassName="active">Signup</Link>
        </li>
        <li>
          <Link to="/login" activeClassName="active">Login</Link>
        </li>
      </ul>
    )
  }

  renderUser () {
    const currentUser = this.props.currentUser
    return (
      //<ul className="nav navbar-nav navbar-right">
      <li className="nav-item" id="welcome-message">
        <Link to={`/profile/${currentUser.id}`} activeClassName="active">
         {`Welcome back ${currentUser.name || currentUser.email}!`}
        </Link>
      </li>
      //</ul>
    )
  }

  renderLogout () {
    return (
      //<ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
        <button
          className="navbar-btn btn btn-default"
          onClick={this.props.logout}>
          Logout
        </button>
        </li>
      //</ul>
    )
  }
}

// container: mapStateToProps, mapDispatchToProps, connect()(Navbar)

const mapStateToProps = state => {
  return {
    currentUser: state.auth,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout())
      // dispatch(clearCart())
      browserHistory.push('/')
    },
    fetchCart: userId => {
      dispatch(fetchCart(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
