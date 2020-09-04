import {createReducer} from "redux-create-reducer";

const initState = {
  item:{}
}

const popularize = createReducer(initState,{
  ['item/set'](state,action){
    return{
      ...state,
      item:action.payload
    }
  }
})
export default popularize
