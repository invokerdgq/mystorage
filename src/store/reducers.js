import { combineReducers } from 'redux'
import cart from './cart'
import user from './user'
import address from './address'
import member from './member'
import tabBar from './tab-bar'
import colors from './colors'
import giftId from "./giftId";
import step from './step'
import editSpec from './goods-spec'
import popularize from "./popularize";

export default combineReducers({
  cart,
  user,
  address,
  member,
  tabBar,
  colors,
  giftId,
  step,
  editSpec,
  popularize
})
