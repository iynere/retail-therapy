import React from 'react'
import {browserHistory} from 'react-router'

export const Signup = ({ signup }) => (
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
)

import {signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
	state => ({}),
	{signup}
)(Signup)
