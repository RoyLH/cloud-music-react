import {
  getHotKeyWordsRequest,
  getResultSongsListRequest,
  getSuggestRequest,
} from '@/api/request'
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'

interface State {
  hotList: any[]
  suggest: any
  songsList: any[]
  enterLoading: boolean
}

const initialState: State = {
  hotList: [],
  suggest: {},
  songsList: [],
  enterLoading: false,
}

export const getHotKeyWords = createAsyncThunk(
  'search/getHotKeyWords',
  async () => {
    return await getHotKeyWordsRequest()
  }
)

export const getSuggest = createAsyncThunk(
  'search/getSuggest',
  async (query: string) => {
    return await Promise.all([
      getSuggestRequest(query),
      getResultSongsListRequest(query),
    ])
  }
)

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    SET_HOT_KEYWRODS(state, action) {
      state.hotList = action.payload
    },
    SET_SUGGEST(state, action) {
      state.suggest = action.payload
    },
    SET_RESULT_SONGS_LIST(state, action) {
      state.songsList = action.payload
    },
    SET_ENTER_LOADING(state, action) {
      state.enterLoading = action.payload
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder.addCase(getHotKeyWords.pending, () => {})
    builder.addCase(getHotKeyWords.fulfilled, (state: State, { payload }) => {
      const {
        result: { hots },
      } = payload as any

      slice.caseReducers.SET_HOT_KEYWRODS(state, {
        type: 'SET_HOT_KEYWRODS',
        payload: hots,
      })
    })
    builder.addCase(getHotKeyWords.rejected, () => {})

    builder.addCase(getSuggest.pending, () => {})
    builder.addCase(getSuggest.fulfilled, (state: State, { payload }) => {
      const [
        { result: suggest = [] },
        {
          result: { songs = [] },
        },
      ] = payload as any

      slice.caseReducers.SET_SUGGEST(state, {
        type: 'SET_SUGGEST',
        payload: suggest,
      })

      slice.caseReducers.SET_RESULT_SONGS_LIST(state, {
        type: 'SET_RESULT_SONGS_LIST',
        payload: songs,
      })
      slice.caseReducers.SET_ENTER_LOADING(state, {
        type: 'SET_ENTER_LOADING',
        payload: false,
      })
    })
    builder.addCase(getSuggest.rejected, () => {})
  },
})

export default slice
