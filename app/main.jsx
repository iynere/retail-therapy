'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'
import Root from './components/Root'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import {fetchProducts} from './reducers/products'
import {fetchProduct} from './reducers/product'
import Login from './components/Login'
import Signup from './components/Signup'
import WhoAmI from './components/WhoAmI'
import LandingPage from './components/LandingPage'

const onProductsEnter = function(){
	store.dispatch(fetchProducts())
}

const onProductEnter = nextRouterState => {
	store.dispatch(fetchProduct(nextRouterState.params.id));
};

render (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Root}>
				<IndexRedirect to="/allProducts" />
				<Route path="/allProducts" component={AllProducts} onEnter={onProductsEnter} />
                <Route path="/page" component={LandingPage} />
				<Route path="/allProducts/:id" component={SingleProduct} onEnter={onProductEnter} />
				<Route path="/signup" component = {Signup} />
				<Route path="/login" component = {Login} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('main')
)
