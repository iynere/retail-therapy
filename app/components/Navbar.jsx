import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import {logout} from '../reducers/auth'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.renderLoginSignup = this.renderLoginSignup.bind(this)
    this.renderLogout = this.renderLogout.bind(this)
  }

  render () {
  // need to include user in redux store / state
    const currentUser = this.props.currentUser

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
          <Link className="navbar-brand">Retail Theraphy</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto no-padding">
              {currentUser ? this.renderUser() : this.renderLoginSignup()}
            </ul>
            <ul className="navbar-nav mr-auto navbar-right">
              
              <li className="nav-item" id="cart_icon">
                <Link to={currentUser ? `/${currentUser.id}/cart` : '/'}><span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></Link>
              </li>
              {currentUser ? this.renderLogout() : null}
            </ul>
            
          </div>
      </nav>
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
    currentUser: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout()) // need to write this function
      browserHistory.push('/')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
