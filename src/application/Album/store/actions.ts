import { getAlbumDetailRequest } from '@/api/request'
import { fromJS } from 'immutable'
import * as actionTypes from './constants'

const changeCurrentAlbum = (payload: any) => ({
  type: actionTypes.CHANGE_CURRENT_ALBUM,
  payload: fromJS(payload),
})

export const changePullUpLoading = (payload: any) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  payload,
})
export const changeEnterLoading = (payload: any) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload,
})

const changeTotalCount = (payload: any) => ({
  type: actionTypes.CHANGE_TOTAL_COUNT,
  payload,
})

export const changeStartIndex = (payload: any) => ({
  type: actionTypes.CHANGE_START_INDEX,
  payload,
})

export const getAlbumList = (id: string) => {
  return (dispatch: (...args: any[]) => void) => {
    getAlbumDetailRequest(id)
      .then((res: any) => {
        const { playlist } = res

        dispatch(changeCurrentAlbum(playlist))
        dispatch(changeEnterLoading(false))
        dispatch(changeStartIndex(0))
        dispatch(changeTotalCount(playlist.tracks.length))
      })
      .catch(() => {
        console.log('获取album数据失败')
      })
  }
}
