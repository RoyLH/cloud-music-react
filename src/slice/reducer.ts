import albumSlice from '@/application/Album/slice'
import playerSlice from '@/application/Player/slice'
import rankSlice from '@/application/Rank/slice'
import recommendSlice from '@/application/Recommend/slice'
import searchSlice from '@/application/Search/slice'
import singerSlice from '@/application/Singer/slice'
import singersSlice from '@/application/Singers/slice'

const reducer = {
  [albumSlice.name]: albumSlice.reducer,
  [playerSlice.name]: playerSlice.reducer,
  [rankSlice.name]: rankSlice.reducer,
  [recommendSlice.name]: recommendSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  [singerSlice.name]: singerSlice.reducer,
  [singersSlice.name]: singersSlice.reducer,
}

export default reducer
