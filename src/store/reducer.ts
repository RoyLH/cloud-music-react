import { reducer as albumReducer } from '@/application/Album/store'
import { reducer as playerReducer } from '@/application/Player/store'
import { reducer as rankReducer } from '@/application/Rank/store'
import { reducer as recommendReducer } from '@/application/Recommend/store'
import { reducer as searchReducer } from '@/application/Search/store'
import { reducer as singerReducer } from '@/application/Singer/store'
import { reducer as singersReducer } from '@/application/Singers/store'
import { combineReducers } from 'redux-immutable'

export default combineReducers({
  album: albumReducer,
  player: playerReducer,
  rank: rankReducer,
  recommend: recommendReducer,
  search: searchReducer,
  singer: singerReducer,
  singers: singersReducer,
})
