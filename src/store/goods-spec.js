import {createReducer} from "redux-create-reducer";

const initState = {
  simpleForm:{},
  specItems:[],
  nospec:true,
  skus:[]
}

const editSpec = createReducer(initState,{
  ['spec/setSimpleForm'](state,action){
    return{
      ...state,
      simpleForm:action.payload
    }
  },
  ['spec/setSpecItems'](state,action){
    return{
      ...state,
      specItems:action.payload
    }
  },
  ['spec/setNospec'](state,action){
    return{
      ...state,
      nospec:action.payload
    }
  },
  ['spec/setSkus'](state,action){
    return{
      ...state,
      skus:action.payload
    }
  },
  ['spec/clear'](state,action){
    return {
      simpleForm:{},
      specItems:[],
      nospec:true,
      skus:[]
    }
  }
})
export default editSpec
