import { fromJS } from 'immutable'
import * as actionTypes from './constants'

const defaultState = fromJS({
  userInfo: {},
  sentStatus: false,
  loginStatus: false,
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_USER_INFO:
      return state.set('userInfo', action.data)
    case actionTypes.CHANGE_SENT_STATUS:
      return state.set('sentStatus', action.data)
    case actionTypes.CHANGE_LOGIN_STATUS:
      return state.set('loginStatus', action.data)
    default:
      return state
  }
}

export default reducer
