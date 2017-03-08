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
import {fetchProducts} from './reducers/products'
import {fetchProduct} from './reducers/product'
import {fetchProductReviews} from './reducers/reviews'
import {whoami} from './reducers/auth'
import {fetchOrderForCheckout, fetchCart, fetchCompletedOrder} from './reducers/cart'
import {fetchUserOrders} from './reducers/orders'
import Login from './components/Login'
import Signup from './components/Signup'
import LandingPage from './components/LandingPage'
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
}

const onHomeEnter = nextRouterState => {
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
        
const onEditEnter = nextRouterState => {       
  store.dispatch(fetchProduct(nextRouterState.params.id))
}
        
const loadUserOrders = nextRouterState => {
  store.dispatch(fetchUserOrders(nextRouterState.params.userId))
}
  
const onCompleteOrder = nextRouterState => {
  store.dispatch(fetchCompletedOrder(nextRouterState.params.userId, nextRouterState.params.orderId))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root} onEnter={onHomeEnter}>
        <IndexRedirect to="/Home" />
          <Route path="/Home" component={LandingPage} onEnter={onHomeEnter} />
          <Route path="/allProducts/:id" component={SingleProduct} onEnter={onProductEnter} />
          <Route path="/admin/addProduct" component={AddProduct}/>
          <Route path="/admin/editProduct/:id" component={EditProduct} onEnter={onEditEnter}/>
          <Route path="/signup" component = {Signup} />
          <Route path="/login" component = {Login} />
          <Route path="/profile" component={Profile}/>
          <Route path="/profile/:userId" component={Profile}/>
          <Route path="/profile/:userId/manageUsers" component={AdminManageUsers} />
          <Route path="/profile/:userId/manageOrders" component={AdminManageOrders} />
          <Route path="/profile/:userId/manageProducts" component={AdminManageProducts} />
          <Route path="/profile/:userId/orders" component={Orders} onEnter={loadUserOrders}/>
          <Route path="/profile/:userId/accountInfo" component={AccountInfo} />
          <Route path="/profile/:userId/cart" component={CartContainer}/>
          <Route path="/:userId/checkout" component={Checkout} onEnter={loadOrderForCheckout}/>
          <Route path="/:userId/:orderId/complete" component={Complete} onEnter={onCompleteOrder} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
