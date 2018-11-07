import { combineReducers } from 'redux'
import main from './reducer-global'
import bots from './reducer-bots'

export default combineReducers({
  main,
  bots
})
