import { playMode } from '@/api/config'
import { getSongDetailRequest } from '@/api/request'
import { findIndex } from '@/api/utils'
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'

interface State {
  fullScreen: boolean
  playing: boolean
  sequencePlayList: any[]
  playList: any[]
  mode: number
  currentIndex: number
  showPlayList: boolean
  currentSong: any
  speed: number
}

const initialState: State = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {},
  speed: 1,
}

export const getSongDetail = createAsyncThunk(
  'player/getSongDetail',
  async (id: string) => {
    return await getSongDetailRequest(id)
  }
)

const handleInsertSong = (state: any, song: any) => {
  const playList = JSON.parse(JSON.stringify(state.playList))
  const sequenceList = JSON.parse(JSON.stringify(state.sequencePlayList))
  let currentIndex = state.currentIndex
  //看看有没有同款
  const fpIndex = findIndex(song, playList)
  // 如果是当前歌曲直接不处理
  if (fpIndex === currentIndex && currentIndex !== -1) return state
  currentIndex++
  // 把歌放进去,放到当前播放曲目的下一个位置
  playList.splice(currentIndex, 0, song)
  // 如果列表中已经存在要添加的歌
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }

  let sequenceIndex = findIndex(playList[currentIndex], sequenceList) + 1
  const fsIndex = findIndex(song, sequenceList)
  sequenceList.splice(sequenceIndex, 0, song)
  if (fsIndex > -1) {
    if (sequenceIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
      sequenceIndex--
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  state.playList = playList
  state.sequencePlayList = sequenceList
  state.currentIndex = currentIndex
}

const handleDeleteSong = (state: any, song: any) => {
  const playList = JSON.parse(JSON.stringify(state.playList))
  const sequenceList = JSON.parse(JSON.stringify(state.sequencePlayList))
  let currentIndex = state.currentIndex

  const fpIndex = findIndex(song, playList)
  playList.splice(fpIndex, 1)
  if (fpIndex < currentIndex) currentIndex--

  const fsIndex = findIndex(song, sequenceList)
  sequenceList.splice(fsIndex, 1)

  state.playList = playList
  state.sequencePlayList = sequenceList
  state.currentIndex = currentIndex
}

const slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    SET_CURRENT_SONG(state, action) {
      state.currentSong = action.payload
    },
    SET_FULL_SCREEN(state, action) {
      state.fullScreen = action.payload
    },
    SET_PLAYING_STATE(state, action) {
      state.playing = action.payload
    },
    SET_PLAYLIST(state, action) {
      state.playList = action.payload
    },
    SET_SEQUENCE_PLAYLIST(state, action) {
      state.sequencePlayList = action.payload
    },
    SET_PLAY_MODE(state, action) {
      state.mode = action.payload
    },
    SET_CURRENT_INDEX(state, action) {
      state.currentIndex = action.payload
    },
    SET_SHOW_PLAYLIST(state, action) {
      state.showPlayList = action.payload
    },
    INSERT_SONG(state, action) {
      handleInsertSong(state, action.payload)
    },
    DELETE_SONG(state, action) {
      handleDeleteSong(state, action.payload)
    },
    CHANGE_SPEED(state, action) {
      state.speed = action.payload
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder.addCase(getSongDetail.pending, () => {})
    builder.addCase(getSongDetail.fulfilled, (state: State, { payload }) => {
      const {
        songs: [song],
      } = payload as any

      slice.caseReducers.INSERT_SONG(state, {
        type: 'INSERT_SONG',
        payload: song,
      })
    })
    builder.addCase(getSongDetail.rejected, () => {})
  },
})

export default slice
