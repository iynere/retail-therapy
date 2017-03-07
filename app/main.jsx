'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'
import Root from './components/Root'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import CartContainer from './components/CartContainer'
import Checkout from './components/Checkout'
import Complete from './components/Complete'
import {fetchProduct} from './reducers/product'
import {fetchProductReviews} from './reducers/reviews'
import {fetchCart} from './reducers/cart'
import {whoami} from './reducers/auth'
import {fetchOrderForCheckout} from './reducers/cart'
import Login from './components/Login'
import Signup from './components/Signup'
import WhoAmI from './components/WhoAmI'
import LandingPage from './components/LandingPage'
import UserProfile from './components/UserProfile'
import AdminProfile from './components/AdminProfile'
import Profile from './components/Profile'
import AccountInfo from './components/userComponents/AccountInfo'
import AdminManageUsers from './components/userComponents/AdminManageUsers'
import AdminManageOrders from './components/userComponents/AdminManageOrders'
import AdminManageProducts from './components/userComponents/AdminManageProducts'

const onProductEnter = nextRouterState => {
  store.dispatch(fetchProduct(nextRouterState.params.id))
  store.dispatch(fetchProductReviews(nextRouterState.params.id))
  store.dispatch(whoami)
};

const loadCart = nextRouterState => {
  store.dispatch(fetchCart(nextRouterState.params.userId))
}

// will do what loadCart does but fetch the order that is processing (ie, user has clicked 'checkout')
const loadOrderForCheckout = nextRouterState => {
  store.dispatch(fetchOrderForCheckout(nextRouterState.params.userId))
}

const completedOrder = nextRouterState => {
  // fetch order info for completed order,
  // send emails
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root} onEnter={loadCart}>
        <IndexRedirect to="/Home" />
          <Route path="/Home" component={LandingPage} />
          <Route path="/allProducts/:id" component={SingleProduct} onEnter={onProductEnter} />
          <Route path="/signup" component = {Signup} />
          <Route path="/login" component = {Login} />
          <Route path="/profile" component={Profile}/>
          <Route path="/profile/:userId" component={Profile}/>
          <Route path="/user" component={UserProfile} />
          <Route path="/admin" component={AdminProfile} />
          <Route path="/admin/manageUsers" component={AdminManageUsers} />
          <Route path="/admin/manageOrders" component={AdminManageOrders} />
          <Route path="/admin/manageProducts" component={AdminManageProducts} />
          <Route path="/accountInfo" component={AccountInfo} />
          <Route path="/:userId/cart" component={CartContainer} />
          <Route path="/:userId/checkout" component={Checkout} onEnter={loadOrderForCheckout} />
          <Route path="/:userId/complete" component={Complete} onEnter={completedOrder} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
