import React from 'react'
import {browserHistory} from 'react-router'

export const Signup = ({ signup }) => (
	<div className="product-grid">
      <div className="product-card">
        <div className="col-md-2"></div>
        <div className="col-md-8 single-card">
          <div className="col-md-4 padding">
          <h3>Sign up with your email</h3>
		<form className="form-group login-form" onSubmit={evt => {
			evt.preventDefault()
			signup(evt.target.name.value, evt.target.email.value, evt.target.password.value)
			browserHistory.push('/')
		}}>
          <div className="form-group">
              <label for="name">Name</label>
              <input className="form-control" name="name" id="name" placeholder="Lorem ipsum" required/>
            </div>
			<div className="form-group">
              <label for="email">Email</label>
              <input className="form-control" name="email" type="email" id="email" placeholder="Type your email" required/>
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input className="form-control" name="password" type="password" id="password" placeholder="type a good password" required/>
            </div>
			<button className="btn btn-default" type="submit">Sign up</button>
		</form>
        <p>Or:</p>
		<p><a className="btn btn-danger" href="/api/auth/google/login">Sign up with Google</a></p>
		<p><a className="btn btn-primary" href="/api/auth/facebook/login">Sign up with Facebook</a></p>
	</div>
        </div>
	 </div>
    </div>
)

import {signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
	state => ({}),
	{signup}
)(Signup)
