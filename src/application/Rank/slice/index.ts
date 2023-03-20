import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { getRankListRequest } from './../../../api/request'

interface InitialState {
  rankList: any[]
  loading: true
}

const initialState: InitialState = {
  rankList: [],
  loading: true,
}

export const getRankList = createAsyncThunk('rank/getRankList', async () => {
  return await getRankListRequest()
})

const slice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    CHANGE_RANK_LIST(state, action) {
      state.rankList = action.payload
    },
    CHANGE_LOADING(state, action) {
      state.loading = action.payload
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder.addCase(getRankList.pending, () => {})
    builder.addCase(
      getRankList.fulfilled,
      (state: InitialState, { payload }) => {
        const { list } = payload as any

        slice.caseReducers.CHANGE_RANK_LIST(state, {
          type: 'CHANGE_RANK_LIST',
          payload: list,
        })
        slice.caseReducers.CHANGE_LOADING(state, {
          type: 'CHANGE_LOADING',
          payload: false,
        })
      }
    )
    builder.addCase(getRankList.rejected, () => {})
  },
})

export default slice
