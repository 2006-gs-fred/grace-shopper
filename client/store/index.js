import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productsReducer from './products'
import productSingleReducer from './singleProduct'
import cartReducer from './shoppingCart'
import ordersReducer from './orders'
import orderReducer from './order'
import usersReducer from './users'

const reducer = combineReducers({
  user,
  products: productsReducer,
  product: productSingleReducer,
  cart: cartReducer,
  orders: ordersReducer,
  order: orderReducer,
  users: usersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
