import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { getSingerInfoRequest } from './../../../api/request'

interface InitialState {
  artist: any
  songsOfArtist: any[]
  loading: boolean
}

const initialState: InitialState = {
  artist: {},
  songsOfArtist: [],
  loading: true,
}

export const getSingerInfo = createAsyncThunk(
  'singer/getSingerInfo',
  async (id: string) => {
    return await getSingerInfoRequest(id)
  }
)

const slice = createSlice({
  name: 'singer',
  initialState,
  reducers: {
    CHANGE_ARTIST(state, action) {
      state.artist = action.payload
    },
    CHANGE_SONGS_OF_ARTIST(state, action) {
      state.songsOfArtist = action.payload
    },
    CHANGE_ENTER_LOADING(state, action) {
      state.loading = action.payload
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder.addCase(getSingerInfo.pending, () => {})
    builder.addCase(
      getSingerInfo.fulfilled,
      (state: InitialState, { payload }) => {
        const { artist, hotSongs } = payload as any

        slice.caseReducers.CHANGE_ARTIST(state, {
          type: 'CHANGE_ARTIST',
          payload: artist,
        })
        slice.caseReducers.CHANGE_SONGS_OF_ARTIST(state, {
          type: 'CHANGE_SONGS_OF_ARTIST',
          payload: hotSongs,
        })
        slice.caseReducers.CHANGE_ENTER_LOADING(state, {
          type: 'CHANGE_ENTER_LOADING',
          payload: false,
        })
      }
    )
    builder.addCase(getSingerInfo.rejected, () => {})
  },
})

export default slice
