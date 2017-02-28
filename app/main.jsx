'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'
import AllProducts from './components/AllProducts'
import {fetchProducts} from './reducers/products'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

const onProductsEnter = function(){
  store.dispatch(fetchProducts())
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/allProducts" />
        <Route path="/allProducts" component={AllProducts} onEnter={onProductsEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
