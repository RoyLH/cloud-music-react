import { fromJS } from 'immutable'
import { getRankListRequest } from '../../../api/request'
import * as actionTypes from './constants'

const changeRankList = (payload: any) => ({
  type: actionTypes.CHANGE_RANK_LIST,
  payload: fromJS(payload),
})

const changeLoading = (payload: any) => ({
  type: actionTypes.CHANGE_LOADING,
  payload,
})

export const getRankList = () => {
  return (dispatch: (...args: any[]) => void) => {
    getRankListRequest().then((data: any) => {
      const list = data && data.list
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    })
  }
}
