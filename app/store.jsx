import {createStore, /*compose,*/ applyMiddleware} from 'redux'
// import {persistStore, autoRehydrate} from 'redux-persist'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami} from './reducers/auth'

const store = createStore(rootReducer, applyMiddleware(createLogger({ collapsed: true }), thunkMiddleware))

export default store

// Set the auth info at start
store.dispatch(whoami())

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(createLogger({ collapsed: true }), thunkMiddleware),
//     autoRehydrate()
//   )
// )

// persistStore(store)
