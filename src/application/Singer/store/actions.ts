import { fromJS } from 'immutable'
import { getSingerInfoRequest } from '../../../api/request'
import * as actionTypes from './constants'

const changeArtist = (payload: any) => ({
  type: actionTypes.CHANGE_ARTIST,
  payload: fromJS(payload),
})

const changeSongs = (payload: any) => ({
  type: actionTypes.CHANGE_SONGS_OF_ARTIST,
  payload: fromJS(payload),
})
export const changeEnterLoading = (payload: any) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload,
})

export const getSingerInfo = (id: string) => {
  return (dispatch: (...args: any[]) => void) => {
    getSingerInfoRequest(id).then((data: any) => {
      dispatch(changeArtist(data.artist))
      dispatch(changeSongs(data.hotSongs))
      dispatch(changeEnterLoading(false))
    })
  }
}
