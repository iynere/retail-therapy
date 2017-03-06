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
};

const loadCart = nextRouterState => {
  store.dispatch(fetchCart(nextRouterState.params.userId))
}

//TATI: accountInfo should be a sub route of profile/:userId - same with admin routes

render(

  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRedirect to="/page" />
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
          <Route path="/:userId/cart" component={Cart} onEnter={loadCart}/>

      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')

)
