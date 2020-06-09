import { createReducer } from 'redux-create-reducer'

const initGiftId = {
  id: null,
}

const giftId = createReducer(initGiftId, {
  ['giftId/choose'](state, action) {
    const id = action.payload

    return {
      ...state,
      id
    }
  }

})

export default giftId
