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
import {fetchCart} from './reducers/cart'
import Login from './components/Login'
import Signup from './components/Signup'
import WhoAmI from './components/WhoAmI'
import LandingPage from './components/LandingPage'

const onProductEnter = nextRouterState => {
  store.dispatch(fetchProduct(nextRouterState.params.id))
  store.dispatch(fetchProductReviews(nextRouterState.params.id))
};

const loadCart = nextRouterState => {
  store.dispatch(fetchCart(nextRouterState.params.userId))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root} /*onEnter={loadCart}*/>
        <IndexRedirect to="/home" />
        <Route path="/home" component={LandingPage} />
        <Route path="/allProducts/:id" component={SingleProduct} onEnter={onProductEnter} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/:userId/cart" component={Cart} onEnter={loadCart} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
