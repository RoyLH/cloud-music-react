import { getSongDetailRequest } from '@/api/request'
import { fromJS } from 'immutable'
import * as actionTypes from './constants'

export const changeCurrentSong = (payload: any) => ({
  type: actionTypes.SET_CURRENT_SONG,
  payload: fromJS(payload),
})

export const changeFullScreen = (payload: any) => ({
  type: actionTypes.SET_FULL_SCREEN,
  payload,
})

export const changePlayingState = (payload: any) => ({
  type: actionTypes.SET_PLAYING_STATE,
  payload,
})

export const changeSequencePlayList = (payload: any) => ({
  type: actionTypes.SET_SEQUENCE_PLAYLIST,
  payload: fromJS(payload),
})

export const changePlayList = (payload: any) => ({
  type: actionTypes.SET_PLAYLIST,
  payload: fromJS(payload),
})

export const changePlayMode = (payload: any) => ({
  type: actionTypes.SET_PLAY_MODE,
  payload,
})

export const changeSpeed = (payload: any) => ({
  type: actionTypes.CHANGE_SPEED,
  payload,
})

export const changeCurrentIndex = (payload: any) => ({
  type: actionTypes.SET_CURRENT_INDEX,
  payload,
})

export const changeShowPlayList = (payload: any) => ({
  type: actionTypes.SET_SHOW_PLAYLIST,
  payload,
})

export const insertSong = (payload: any) => ({
  type: actionTypes.INSERT_SONG,
  payload,
})

export const deleteSong = (payload: any) => ({
  type: actionTypes.DELETE_SONG,
  payload,
})

export const getSongDetail = (id: string) => {
  return (dispatch: (...args: any[]) => void) => {
    getSongDetailRequest(id).then((res: any) => {
      const {
        songs: [song],
      } = res
      dispatch(insertSong(song))
    })
  }
}
