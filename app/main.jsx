'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'
import Root from './components/Root'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import {fetchProduct} from './reducers/product'
import {fetchProductReviews} from './reducers/reviews'
import Login from './components/Login'
import Signup from './components/Signup'
import WhoAmI from './components/WhoAmI'
import LandingPage from './components/LandingPage'

const onProductEnter = nextRouterState => {
	store.dispatch(fetchProduct(nextRouterState.params.id))
	store.dispatch(fetchProductReviews(nextRouterState.params.id))
};

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Root}>
				<IndexRedirect to="/page" />
        <Route path="/page" component={LandingPage} />
				<Route path="/allProducts/:id" component={SingleProduct} onEnter={onProductEnter} />
				<Route path="/signup" component={Signup} />
				<Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('main')
)
