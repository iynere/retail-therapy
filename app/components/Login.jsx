import React from 'react'
import {browserHistory} from 'react-router'

export const Login = ({ login }) => (
	<div>
		<form onSubmit={evt => {
			evt.preventDefault()
			login(evt.target.username.value, evt.target.password.value)
			browserHistory.push('/')
		} }>
			<input name="username" required/>
			<input name="password" type="password" required/>
			<input type="submit" value="Login" />
		</form>
		<p><a href="/api/auth/google/login">log in with Google</a></p>
		<p><a href="/api/auth/facebook/login">log in with Facebook</a></p>
	</div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
	state => ({}),
	{login},
) (Login)
