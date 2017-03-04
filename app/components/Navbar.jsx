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
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target=".navbar-collapse">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            {/* if we want a Retail Therapy logo we can put it in public and bring it in here / link back to homepage
            <Link className="navbar-brand" to="/"><img src="/images/logo.png" /></Link> */}
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to={currentUser ? `/${currentUser.id}/cart` : '/'}><span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></Link>
              </li>
            </ul>
            {currentUser ? this.renderUser() : this.renderLoginSignup()}
            {currentUser ? this.renderLogout() : null}
          </div>
        </div>
      </nav>
    )
  }

  renderLoginSignup () {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
         <Link to="/signup" activeClassName="active">signup</Link>
        </li>
        <li>
          <Link to="/login" activeClassName="active">login</Link>
        </li>
      </ul>
    )
  }

  renderUser () {
    const currentUser = this.props.currentUser
    return (
      <ul className="nav navbar-nav navbar-right">
      <li>
        <Link to={`/profile/${currentUser.id}`} activeClassName="active">
         {`Welcome ${currentUser.name || currentUser.email}!`}
        </Link>
      </li>
      </ul>
    )
  }

  renderLogout () {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button
          className="navbar-btn btn btn-default"
          onClick={this.props.logout}>
          logout
        </button>
        </li>
      </ul>
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
