import { fromJS, FromJS } from 'immutable'
import * as actionTypes from './constants'

interface State {
  hotList: any[]
  suggestList: any[]
  songsList: any[]
  enterLoading: boolean
}

const defaultState: FromJS<State> = fromJS({
  hotList: [],
  suggestList: [],
  songsList: [],
  enterLoading: false,
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_HOT_KEYWRODS:
      return state.set('hotList', action.payload)
    case actionTypes.SET_SUGGEST_LIST:
      return state.set('suggestList', action.payload)
    case actionTypes.SET_RESULT_SONGS_LIST:
      return state.set('songsList', action.payload)
    case actionTypes.SET_ENTER_LOADING:
      return state.set('enterLoading', action.payload)
    default:
      return state
  }
}

export default reducer
