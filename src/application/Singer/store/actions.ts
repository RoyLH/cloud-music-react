import { fromJS } from 'immutable'
import { getSingerInfoRequest } from '../../../api/request'
import * as actionTypes from './constants'

const changeArtist = (data: any) => ({
  type: actionTypes.CHANGE_ARTIST,
  data: fromJS(data),
})

const changeSongs = (data: any) => ({
  type: actionTypes.CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data),
})
export const changeEnterLoading = (data: any) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
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
