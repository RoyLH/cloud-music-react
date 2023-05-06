import { getAlbumDetailRequest } from '@/api/request'
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'

interface State {
  currentAlbum: any
  pullUpLoading: boolean
  enterLoading: boolean
  startIndex: number
  totalCount: number
}

const initialState: State = {
  currentAlbum: {},
  pullUpLoading: false,
  enterLoading: false,
  startIndex: 0,
  totalCount: 0,
}

export const getAlbumList = createAsyncThunk(
  'album/getAlbumList',
  async (id: string) => {
    return await getAlbumDetailRequest(id)
  }
)

const slice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    CHANGE_CURRENT_ALBUM(state, action) {
      state.currentAlbum = action.payload
    },
    CHANGE_PULLUP_LOADING(state, action) {
      state.pullUpLoading = action.payload
    },
    CHANGE_ENTER_LOADING(state, action) {
      state.enterLoading = action.payload
    },
    CHANGE_START_INDEX(state, action) {
      state.startIndex = action.payload
      state.pullUpLoading = false
    },
    CHANGE_TOTAL_COUNT(state, action) {
      state.totalCount = action.payload
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder.addCase(getAlbumList.pending, () => {})
    builder.addCase(getAlbumList.fulfilled, (state: State, { payload }) => {
      const { playlist } = payload as any

      slice.caseReducers.CHANGE_CURRENT_ALBUM(state, {
        type: 'CHANGE_CURRENT_ALBUM',
        payload: playlist,
      })

      slice.caseReducers.CHANGE_ENTER_LOADING(state, {
        type: 'CHANGE_ENTER_LOADING',
        payload: false,
      })

      slice.caseReducers.CHANGE_START_INDEX(state, {
        type: 'CHANGE_START_INDEX',
        payload: 0,
      })

      slice.caseReducers.CHANGE_TOTAL_COUNT(state, {
        type: 'CHANGE_TOTAL_COUNT',
        payload: playlist.tracks.length,
      })
    })
    builder.addCase(getAlbumList.rejected, () => {
      console.log('获取album数据失败')
    })
  },
})

export default slice
