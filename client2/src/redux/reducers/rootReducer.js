// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import lead from './lead'
import refMaker from './refMaker'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  lead,
  refMaker,
})

export default rootReducer
