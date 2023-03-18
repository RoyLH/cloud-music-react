import { fromJS } from 'immutable'
import * as actionTypes from './constants'

const defaultState = fromJS({
  currentAlbum: {},
  pullUpLoading: false,
  enterLoading: false,
  startIndex: 0,
  totalCount: 0,
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      return state.set('currentAlbum', action.data)
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    case actionTypes.CHANGE_START_INDEX:
      return state
        .set('startIndex', action.data)
        .set('pullUpLoading', false as any)
    case actionTypes.CHANGE_TOTAL_COUNT:
      return state.set('totalCount', action.data)
    default:
      return state
  }
}

export default reducer
