import { getHotSingerListRequest, getSingerListRequest } from '@/api/request'
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'

interface State {
  category: string
  alpha: string
  singerList: any[]
  enterLoading: boolean
  pullUpLoading: boolean
  pullDownLoading: boolean
  listOffset: number // 请求列表的偏移不是page，是个数
}

const initialState: State = {
  category: '',
  alpha: '',
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  listOffset: 0,
}

export const getHotSingerList = createAsyncThunk(
  'singers/getHotSingerList',
  async () => {
    return await getHotSingerListRequest(0)
  }
)

export const refreshMoreHotSingerList = createAsyncThunk(
  'singers/refreshMoreHotSingerList',
  async (arg, thunkAPI) => {
    const {
      singer: { listOffset },
    } = thunkAPI.getState() as any
    return await getHotSingerListRequest(listOffset)
  }
)

export const getSingerList = createAsyncThunk(
  'singers/getSingerList',
  async (arg, thunkAPI) => {
    const {
      singers: { category, alpha, listOffset },
    } = thunkAPI.getState() as any
    return await getSingerListRequest(category, alpha, listOffset)
  }
)

export const refreshMoreSingerList = createAsyncThunk(
  'singers/refreshMoreSingerList',
  async (arg, thunkAPI) => {
    const {
      singers: { category, alpha, listOffset },
    } = thunkAPI.getState() as any
    return await getSingerListRequest(category, alpha, listOffset)
  }
)

const slice = createSlice({
  name: 'singers',
  initialState,
  reducers: {
    CHANGE_ALPHA(state, action) {
      state.alpha = action.payload
      state.listOffset = 0
      state.enterLoading = true
    },
    CHANGE_CATOGORY(state, action) {
      state.category = action.payload
      state.listOffset = 0
      state.enterLoading = true
    },
    CHANGE_SINGER_LIST(state, action) {
      state.singerList = action.payload
    },
    CHANGE_LIST_OFFSET(state, action) {
      state.listOffset = action.payload
    },

    CHANGE_ENTER_LOADING(state, action) {
      state.enterLoading = action.payload
    },
    CHANGE_PULLUP_LOADING(state, action) {
      state.pullUpLoading = action.payload
    },
    CHANGE_PULLDOWN_LOADING(state, action) {
      state.pullDownLoading = action.payload
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder.addCase(getHotSingerList.pending, () => {})
    builder.addCase(getHotSingerList.fulfilled, (state: State, { payload }) => {
      const { artists } = payload as any

      slice.caseReducers.CHANGE_SINGER_LIST(state, {
        type: 'CHANGE_SINGER_LIST',
        payload: artists,
      })
      slice.caseReducers.CHANGE_ENTER_LOADING(state, {
        type: 'CHANGE_ENTER_LOADING',
        payload: false,
      })
      slice.caseReducers.CHANGE_PULLUP_LOADING(state, {
        type: 'CHANGE_PULLUP_LOADING',
        payload: false,
      })
      slice.caseReducers.CHANGE_LIST_OFFSET(state, {
        type: 'CHANGE_LIST_OFFSET',
        payload: artists.length,
      })
    })
    builder.addCase(getHotSingerList.rejected, () => {
      console.log('热门歌手数据获取失败')
    })

    builder.addCase(refreshMoreHotSingerList.pending, () => {})
    builder.addCase(
      refreshMoreHotSingerList.fulfilled,
      (state: State, { payload }) => {
        const { singerList } = state
        const { artists } = payload as any

        const data = [...singerList, ...artists]

        slice.caseReducers.CHANGE_SINGER_LIST(state, {
          type: 'CHANGE_SINGER_LIST',
          payload: data,
        })
        slice.caseReducers.CHANGE_PULLUP_LOADING(state, {
          type: 'CHANGE_PULLUP_LOADING',
          payload: false,
        })
        slice.caseReducers.CHANGE_LIST_OFFSET(state, {
          type: 'CHANGE_LIST_OFFSET',
          payload: data.length,
        })
      }
    )
    builder.addCase(refreshMoreHotSingerList.rejected, () => {
      console.log('热门歌手数据获取失败')
    })

    builder.addCase(getSingerList.pending, () => {})
    builder.addCase(getSingerList.fulfilled, (state: State, { payload }) => {
      const { artists } = payload as any

      slice.caseReducers.CHANGE_SINGER_LIST(state, {
        type: 'CHANGE_SINGER_LIST',
        payload: artists,
      })
      slice.caseReducers.CHANGE_ENTER_LOADING(state, {
        type: 'CHANGE_ENTER_LOADING',
        payload: false,
      })
      slice.caseReducers.CHANGE_PULLUP_LOADING(state, {
        type: 'CHANGE_PULLUP_LOADING',
        payload: false,
      })
      slice.caseReducers.CHANGE_LIST_OFFSET(state, {
        type: 'CHANGE_LIST_OFFSET',
        payload: artists.length,
      })
    })
    builder.addCase(getSingerList.rejected, () => {
      console.log('歌手数据获取失败')
    })

    builder.addCase(refreshMoreSingerList.pending, () => {})
    builder.addCase(
      refreshMoreSingerList.fulfilled,
      (state: State, { payload }) => {
        const { singerList } = state
        const { artists } = payload as any

        const data = [...singerList, ...artists]

        slice.caseReducers.CHANGE_SINGER_LIST(state, {
          type: 'CHANGE_SINGER_LIST',
          payload: data,
        })
        slice.caseReducers.CHANGE_PULLUP_LOADING(state, {
          type: 'CHANGE_PULLUP_LOADING',
          payload: false,
        })
        slice.caseReducers.CHANGE_LIST_OFFSET(state, {
          type: 'CHANGE_LIST_OFFSET',
          payload: data.length,
        })
      }
    )
    builder.addCase(refreshMoreSingerList.rejected, () => {
      console.log('歌手数据获取失败')
    })
  },
})

export default slice
