'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'
import Root from './components/Root'
import AllProducts from './components/AllProducts'
import {fetchProducts} from './reducers/products'
import Login from './components/Login'
import Signup from './components/Signup'
import WhoAmI from './components/WhoAmI'

const onProductsEnter = function(){
  store.dispatch(fetchProducts())
}

render (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Root}>
        <Route path="/allProducts" component={AllProducts} onEnter={onProductsEnter} />
				<Route path="/signup" component = {Signup} />
				<Route path="/login" component = {Login} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('main')
)
