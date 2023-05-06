import {
  getHotKeyWordsRequest,
  getResultSongsListRequest,
  getSuggestListRequest,
} from '@/api/request'
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'

interface State {
  hotList: any[]
  suggestList: any[]
  songsList: any[]
  enterLoading: boolean
}

const initialState: State = {
  hotList: [],
  suggestList: [],
  songsList: [],
  enterLoading: false,
}

export const getHotKeyWords = createAsyncThunk(
  'search/getHotKeyWords',
  async () => {
    return await getHotKeyWordsRequest()
  }
)

export const getSuggestList = createAsyncThunk(
  'search/getSuggestList',
  async (query: string) => {
    return await Promise.all([
      getSuggestListRequest(query),
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
    SET_SUGGEST_LIST(state, action) {
      state.suggestList = action.payload
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

    builder.addCase(getSuggestList.pending, () => {})
    builder.addCase(getSuggestList.fulfilled, (state: State, { payload }) => {
      const [
        { result: suggestList = [] },
        {
          result: { songs = [] },
        },
      ] = payload as any

      slice.caseReducers.SET_SUGGEST_LIST(state, {
        type: 'SET_SUGGEST_LIST',
        payload: suggestList,
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
    builder.addCase(getSuggestList.rejected, () => {})
  },
})

export default slice
