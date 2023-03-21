import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import {
  getBannerRequest,
  getRecommendListRequest,
} from './../../../api/request'

interface State {
  bannerList: any[]
  recommendList: any[]
  enterLoading: boolean
}

const initialState: State = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
}

export const getBannerList = createAsyncThunk(
  'recommend/getBannerList',
  async () => {
    return await getBannerRequest()
  }
)

export const getRecommendList = createAsyncThunk(
  'recommend/getRecommendList',
  async () => {
    return await getRecommendListRequest()
  }
)

const slice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    CHANGE_BANNER(state, action) {
      state.bannerList = action.payload
    },
    CHANGE_RECOMMEND_LIST(state, action) {
      state.recommendList = action.payload
    },
    CHANGE_ENTER_LOADING(state, action) {
      state.enterLoading = action.payload
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder.addCase(getBannerList.pending, () => {})
    builder.addCase(getBannerList.fulfilled, (state: State, { payload }) => {
      const { banners } = payload as any
      slice.caseReducers.CHANGE_BANNER(state, {
        type: 'CHANGE_BANNER',
        payload: banners,
      })
    })
    builder.addCase(getBannerList.rejected, () => {
      console.log('轮播图数据传输错误')
    })

    builder.addCase(getRecommendList.pending, () => {})
    builder.addCase(getRecommendList.fulfilled, (state: State, { payload }) => {
      const { result } = payload as any

      slice.caseReducers.CHANGE_RECOMMEND_LIST(state, {
        type: 'CHANGE_RECOMMEND_LIST',
        payload: result,
      })
      slice.caseReducers.CHANGE_ENTER_LOADING(state, {
        type: 'CHANGE_ENTER_LOADING',
        payload: false,
      })
    })
    builder.addCase(getRecommendList.rejected, () => {
      console.log('推荐歌单数据传输错误')
    })
  },
})

export default slice
