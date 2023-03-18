import { fromJS } from 'immutable'
import {
  getHotKeyWordsRequest,
  getResultSongsListRequest,
  getSuggestListRequest,
} from '../../../api/request'
import * as actionTypes from './constants'

const changeHotKeyWords = (data: any) => ({
  type: actionTypes.SET_HOT_KEYWRODS,
  data: fromJS(data),
})

const changeSuggestList = (data: any) => ({
  type: actionTypes.SET_SUGGEST_LIST,
  data: fromJS(data),
})

const changeResultSongs = (data: any) => ({
  type: actionTypes.SET_RESULT_SONGS_LIST,
  data: fromJS(data),
})

export const changeEnterLoading = (data: any) => ({
  type: actionTypes.SET_ENTER_LOADING,
  data,
})

export const getHotKeyWords = () => {
  return (dispatch: (...args: any[]) => void) => {
    getHotKeyWordsRequest().then((data: any) => {
      const list = data.result.hots
      dispatch(changeHotKeyWords(list))
    })
  }
}
export const getSuggestList = (query: string) => {
  return (dispatch: (...args: any[]) => void) => {
    getSuggestListRequest(query).then((data: any) => {
      if (!data) return
      const res = data.result || []
      dispatch(changeSuggestList(res))
    })
    getResultSongsListRequest(query).then((data: any) => {
      if (!data) return
      const res = data.result.songs || []
      dispatch(changeResultSongs(res))
      dispatch(changeEnterLoading(false))
    })
  }
}
