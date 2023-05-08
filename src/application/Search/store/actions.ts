import {
  getHotKeyWordsRequest,
  getResultSongsListRequest,
  getSuggestRequest,
} from '@/api/request'
import { fromJS } from 'immutable'
import * as actionTypes from './constants'

const changeHotKeyWords = (payload: any) => ({
  type: actionTypes.SET_HOT_KEYWRODS,
  payload: fromJS(payload),
})

const changeSuggest = (payload: any) => ({
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
export const getSuggest = (query: string) => {
  return (dispatch: (...args: any[]) => void) => {
    getSuggestRequest(query).then((res: any) => {
      const { result: suggest = [] } = res

      dispatch(changeSuggest(suggest))
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
