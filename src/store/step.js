import { createReducer } from 'redux-create-reducer'

const initState ={
  currentStep:[
    {
      number: 2,
      price: 59.9,
      level: 1
    },
    {
      number: 5,
      price: 19.9,
      level: 2
    },
    {
      number: 10,
      price: 9.9,
      level: 3
    },
    {
      number: 28,
      price: 1,
      level: 4
    }
  ]
}

const step = createReducer(initState, {
  ['step'](state,action){
    console.log('--------------设置step-----------------')
    const current = action.payload
    return {
     ...state,
    currentStep:current
  }
  }
})

export default step
