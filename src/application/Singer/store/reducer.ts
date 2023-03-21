import { fromJS, FromJS } from 'immutable'
import * as actionTypes from './constants'

interface State {
  artist: any
  songsOfArtist: any[]
  loading: boolean
}

const defaultState: FromJS<State> = fromJS({
  artist: {},
  songsOfArtist: [],
  loading: true,
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      return state.set('artist', action.payload)
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      return state.set('songsOfArtist', action.payload)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('loading', action.payload)
    default:
      return state
  }
}

export default reducer
