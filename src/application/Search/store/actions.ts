import {
  getHotKeyWordsRequest,
  getResultSongsListRequest,
  getSuggestListRequest,
} from '@/api/request'
import { fromJS } from 'immutable'
import * as actionTypes from './constants'

const changeHotKeyWords = (payload: any) => ({
  type: actionTypes.SET_HOT_KEYWRODS,
  payload: fromJS(payload),
})

const changeSuggestList = (payload: any) => ({
  type: actionTypes.SET_SUGGEST_LIST,
  payload: fromJS(payload),
})

const changeResultSongs = (payload: any) => ({
  type: actionTypes.SET_RESULT_SONGS_LIST,
  payload: fromJS(payload),
})

export const changeEnterLoading = (payload: any) => ({
  type: actionTypes.SET_ENTER_LOADING,
  payload,
})

export const getHotKeyWords = () => {
  return (dispatch: (...args: any[]) => void) => {
    getHotKeyWordsRequest().then((res: any) => {
      const {
        result: { hots },
      } = res
      dispatch(changeHotKeyWords(hots))
    })
  }
}
export const getSuggestList = (query: string) => {
  return (dispatch: (...args: any[]) => void) => {
    getSuggestListRequest(query).then((res: any) => {
      const { result: suggestList = [] } = res

      dispatch(changeSuggestList(suggestList))
    })
    getResultSongsListRequest(query).then((res: any) => {
      const {
        result: { songs = [] },
      } = res

      dispatch(changeResultSongs(songs))
      dispatch(changeEnterLoading(false))
    })
  }
}
