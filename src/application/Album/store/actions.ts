import { fromJS } from 'immutable'
import { getAlbumDetailRequest } from '../../../api/request'
import * as actionTypes from './constants'

const changeCurrentAlbum = (data: any) => ({
  type: actionTypes.CHANGE_CURRENT_ALBUM,
  data: fromJS(data),
})

export const changePullUpLoading = (data: any) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data,
})
export const changeEnterLoading = (data: any) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
})

const changeTotalCount = (data: any) => ({
  type: actionTypes.CHANGE_TOTAL_COUNT,
  data,
})

export const changeStartIndex = (data: any) => ({
  type: actionTypes.CHANGE_START_INDEX,
  data,
})

export const getAlbumList = (id: string) => {
  return (dispatch: (...args: any[]) => void) => {
    getAlbumDetailRequest(id)
      .then((res: any) => {
        const data = res.playlist
        dispatch(changeCurrentAlbum(data))
        dispatch(changeEnterLoading(false))
        dispatch(changeStartIndex(0))
        dispatch(changeTotalCount(data.tracks.length))
      })
      .catch(() => {
        console.log('获取album数据失败!')
      })
  }
}
