import React from 'react'

export const Signup = ({ signup }) => (
	<form onSubmit={evt => {
		evt.preventDefault()
		signup()
	}}>
		<input name="name" />
		<input name="email" />
		<input name="password" type="password" />
		<input type="submit" value="Signup" />
	</form>
)

import {signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
	state => ({}),
	{signup}
)(Signup)
