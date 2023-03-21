import { fromJS, FromJS } from 'immutable'
import * as actionTypes from './constants'

interface State {
  currentAlbum: any
  pullUpLoading: boolean
  enterLoading: boolean
  startIndex: number
  totalCount: number
}

const defaultState: FromJS<State> = fromJS({
  currentAlbum: {},
  pullUpLoading: false,
  enterLoading: false,
  startIndex: 0,
  totalCount: 0,
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      return state.set('currentAlbum', action.payload)
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.payload)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.payload)
    case actionTypes.CHANGE_START_INDEX:
      return state
        .set('startIndex', action.payload)
        .set('pullUpLoading', false as any)
    case actionTypes.CHANGE_TOTAL_COUNT:
      return state.set('totalCount', action.payload)
    default:
      return state
  }
}

export default reducer
