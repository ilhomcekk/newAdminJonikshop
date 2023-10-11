import { combineReducers } from 'redux'
import authReducer from './authReducer'
import contentReducer from './contentReducer'
import orderReducer from './orderReducer'
import productReducer from './productReducer'
import referralReducer from './referralReducer'
import transactionReducer from './transactionReducer'

const reducer = combineReducers({
  content: contentReducer,
  auth: authReducer,
  order: orderReducer,
  product: productReducer,
  transaction: transactionReducer,
  ref: referralReducer,
})

export default reducer
