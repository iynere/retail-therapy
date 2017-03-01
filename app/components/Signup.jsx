import React from 'react'
import {browserHistory} from 'react-router'

export const Signup = ({ signup }) => (
	<div>
		<form onSubmit={evt => {
			evt.preventDefault()
			signup(evt.target.name.value, evt.target.email.value, evt.target.password.value)
			browserHistory.push('/')
		}}>
			<input name="name" placeholder="type your name"/>
			<input name="email" placeholder="type your email"/>
			<input name="password" type="password" placeholder="type a good password" />
			<input type="submit" value="Signup" />
		</form>
		<p><a href="/api/auth/google/signup">sign up with Google</a></p>
		<p><a href="/api/auth/facebook/signup">sign up with Facebook</a></p>
	</div>
)

import {signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
	state => ({}),
	{signup}
)(Signup)
