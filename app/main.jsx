'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'
import Root from './components/Root'
import SingleProduct from './components/SingleProduct'
import CartContainer from './components/CartContainer'
import Checkout from './components/Checkout'
import Complete from './components/Complete'
import {fetchProduct} from './reducers/product'
import {fetchProductReviews} from './reducers/reviews'
import {whoami} from './reducers/auth'
import {fetchOrderForCheckout, fetchCart} from './reducers/cart'
import {fetchUserOrders} from './reducers/orders'
import Login from './components/Login'
import Signup from './components/Signup'
import LandingPage from './components/LandingPage'
import UserProfile from './components/UserProfile'
import AdminProfile from './components/AdminProfile'
import Profile from './components/Profile'
import AccountInfo from './components/userComponents/AccountInfo'
import AdminManageUsers from './components/userComponents/AdminManageUsers'
import AdminManageOrders from './components/userComponents/AdminManageOrders'
import AdminManageProducts from './components/userComponents/AdminManageProducts'
import ProductForm from './components/ProductForm'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'
import Orders from './components/userComponents/Orders'

const onProductEnter = nextRouterState => {
  store.dispatch(fetchProduct(nextRouterState.params.id))
  store.dispatch(fetchProductReviews(nextRouterState.params.id))
  store.dispatch(whoami)
}

const loadCart = nextRouterState => {
  store.dispatch(fetchCart(nextRouterState.params.userId))
}
       
const onCartEnter = nextRouterState => {
  store.dispatch(fetchCart(nextRouterState.params.userId))
}

const loadOrderForCheckout = nextRouterState => {
  store.dispatch(fetchOrderForCheckout(nextRouterState.params.userId))
}
        
const onEditEnter = nextRouterState => {	     store.dispatch(fetchProduct(nextRouterState.params.id))
};
        
const loadUserOrders = nextRouterState => {
  store.dispatch(fetchUserOrders(nextRouterState.params.userId))
}
  
const completedOrder = nextRouterState => {
  // fetch order info for completed order,
  // send emails
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root} onEnter={onProductEnter}>
        <IndexRedirect to="/Home" />
          <Route path="/Home" component={LandingPage} onEnter={onProductEnter} />
          <Route path="/allProducts/:id" component={SingleProduct} onEnter={onProductEnter} />
            <Route path="/admin/addProduct" component={AddProduct}/>
            <Route path="/admin/editProduct/:id" component={EditProduct} onEnter={onEditEnter}/>
          <Route path="/signup" component = {Signup} />
          <Route path="/login" component = {Login} />
          <Route path="/profile" component={Profile}/>
          <Route path="/profile/:userId" component={Profile}/>
          <Route path="/user" component={UserProfile} />
          <Route path="/admin" component={AdminProfile} />
          <Route path="/admin/manageUsers" component={AdminManageUsers} />
          <Route path="/admin/manageOrders" component={AdminManageOrders} />
          <Route path="/admin/manageProducts" component={AdminManageProducts} />
          <Route path="/:userId/orders" component={Orders} onEnter={loadUserOrders}/>
          <Route path="/:userId/accountInfo" component={AccountInfo} />
          <Route path="/:userId/cart" component={CartContainer}/>
          <Route path="/:userId/checkout" component={Checkout} onEnter={loadOrderForCheckout}/>
          <Route path="/:userId/complete" component={Complete} onEnter={completedOrder} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
