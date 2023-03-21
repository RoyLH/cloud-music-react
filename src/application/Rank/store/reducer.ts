import { fromJS, FromJS } from 'immutable'
import * as actionTypes from './constants'

interface State {
  rankList: any[]
  loading: true
}

const defaultState: FromJS<State> = fromJS({
  rankList: [],
  loading: true,
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_RANK_LIST:
      return state.set('rankList', action.payload)
    case actionTypes.CHANGE_LOADING:
      return state.set('loading', action.payload)
    default:
      return state
  }
}

export default reducer
