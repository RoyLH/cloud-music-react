import { fromJS } from 'immutable'
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from '../../../api/request'
import * as actionTypes from './constants'

export const changeCategory = (data: any) => ({
  type: actionTypes.CHANGE_CATOGORY,
  data,
})

export const changeAlpha = (data: any) => ({
  type: actionTypes.CHANGE_ALPHA,
  data,
})

const changeSingerList = (data: any) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  data: fromJS(data),
})

export const changeListOffset = (data: any) => ({
  type: actionTypes.CHANGE_LIST_OFFSET,
  data,
})

//进场loading
export const changeEnterLoading = (data: any) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
})

//滑动最底部loading
export const changePullUpLoading = (data: any) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data,
})

//顶部下拉刷新loading
export const changePullDownLoading = (data: any) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data,
})

export const getHotSingerList = () => {
  return (dispatch: (...args: any[]) => void) => {
    getHotSingerListRequest(0)
      .then((res: any) => {
        const data = res.artists
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))
        dispatch(changePullDownLoading(false))
        dispatch(changeListOffset(data.length))
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
        const data = [...singerList, ...res.artists]
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
        const data = res.artists
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))
        dispatch(changePullDownLoading(false))
        dispatch(changeListOffset(data.length))
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
        const data = [...singerList, ...res.artists]
        dispatch(changeSingerList(data))
        dispatch(changePullUpLoading(false))
        dispatch(changeListOffset(data.length))
      })
      .catch(() => {
        console.log('歌手数据获取失败')
      })
  }
}
