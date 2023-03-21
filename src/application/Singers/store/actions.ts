import { fromJS } from 'immutable'
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from '../../../api/request'
import * as actionTypes from './constants'

export const changeCategory = (payload: any) => ({
  type: actionTypes.CHANGE_CATOGORY,
  payload,
})

export const changeAlpha = (payload: any) => ({
  type: actionTypes.CHANGE_ALPHA,
  payload,
})

const changeSingerList = (payload: any) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  payload: fromJS(payload),
})

export const changeListOffset = (payload: any) => ({
  type: actionTypes.CHANGE_LIST_OFFSET,
  payload,
})

//进场loading
export const changeEnterLoading = (payload: any) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload,
})

//滑动最底部loading
export const changePullUpLoading = (payload: any) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  payload,
})

//顶部下拉刷新loading
export const changePullDownLoading = (payload: any) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  payload,
})

export const getHotSingerList = () => {
  return (dispatch: (...args: any[]) => void) => {
    getHotSingerListRequest(0)
      .then((res: any) => {
        const { artists } = res

        dispatch(changeSingerList(artists))
        dispatch(changeEnterLoading(false))
        dispatch(changePullDownLoading(false))
        dispatch(changeListOffset(artists.length))
      })
      .catch(() => {
        console.log('热门歌手数据获取失败')
      })
  }
}
export const refreshMoreHotSingerList = () => {
  return (dispatch: (...args: any[]) => void, getState: any) => {
    const offset = getState().getIn(['singers', 'listOffset'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()

    getHotSingerListRequest(offset)
      .then((res: any) => {
        const { artists } = res
        const data = [...singerList, ...artists]

        dispatch(changeSingerList(data))
        dispatch(changePullUpLoading(false))
        dispatch(changeListOffset(data.length))
      })
      .catch(() => {
        console.log('热门歌手数据获取失败')
      })
  }
}

export const getSingerList = () => {
  return (dispatch: (...args: any[]) => void, getState: any) => {
    const offset = getState().getIn(['singers', 'listOffset'])
    const category = getState().getIn(['singers', 'category'])
    const alpha = getState().getIn(['singers', 'alpha'])

    getSingerListRequest(category, alpha, offset)
      .then((res: any) => {
        const { artists } = res

        dispatch(changeSingerList(artists))
        dispatch(changeEnterLoading(false))
        dispatch(changePullDownLoading(false))
        dispatch(changeListOffset(artists.length))
      })
      .catch(() => {
        console.log('歌手数据获取失败')
      })
  }
}

export const refreshMoreSingerList = () => {
  return (dispatch: (...args: any[]) => void, getState: any) => {
    const category = getState().getIn(['singers', 'category'])
    const alpha = getState().getIn(['singers', 'alpha'])
    const offset = getState().getIn(['singers', 'listOffset'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()

    getSingerListRequest(category, alpha, offset)
      .then((res: any) => {
        const { artists } = res
        const data = [...singerList, ...artists]

        dispatch(changeSingerList(data))
        dispatch(changePullUpLoading(false))
        dispatch(changeListOffset(data.length))
      })
      .catch(() => {
        console.log('歌手数据获取失败')
      })
  }
}
