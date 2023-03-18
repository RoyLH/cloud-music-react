import { fromJS } from 'immutable'
import { getRankListRequest } from '../../../api/request'
import * as actionTypes from './constants'

const changeRankList = (data: any) => ({
  type: actionTypes.CHANGE_RANK_LIST,
  data: fromJS(data),
})

const changeLoading = (data: any) => ({
  type: actionTypes.CHANGE_LOADING,
  data,
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
