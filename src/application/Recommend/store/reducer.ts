import { fromJS, FromJS } from 'immutable'
import * as actionTypes from './constants'

interface State {
  bannerList: any[]
  recommendList: any[]
  enterLoading: boolean
}

const defaultState: FromJS<State> = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true,
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.payload)
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.payload)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.payload)
    default:
      return state
  }
}

export default reducer
