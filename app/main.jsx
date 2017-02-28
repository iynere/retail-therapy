'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Root from './components/Root'
import Jokes from './components/Jokes'
import Login from './components/Login'
import Signup from './components/Signup'
import WhoAmI from './components/WhoAmI'

// const ExampleApp = connect(
// 	({ auth }) => ({ user: auth })
// ) (
// 	({ user, children }) =>
// 		<div>
// 			<nav>
// 				{user ? <WhoAmI/> : <Signup/>} {/* <Login/>*/}
// 			</nav> 
// 			{children}
// 		</div>
// )

render (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Root}>
				<Route path="/signup" component = {Signup} />
				<Route path="/login" component = {Login} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('main')
)