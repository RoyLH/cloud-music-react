import { fromJS, FromJS } from 'immutable'
import * as actionTypes from './constants'

interface State {
  category: string
  alpha: string
  singerList: any[]
  enterLoading: boolean
  pullUpLoading: boolean
  pullDownLoading: boolean
  listOffset: number // 请求列表的偏移不是page，是个数
}

const defaultState: FromJS<State> = fromJS({
  category: '',
  alpha: '',
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  listOffset: 0, // 请求列表的偏移不是page，是个数
})

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.CHANGE_ALPHA:
      return state.merge({
        alpha: action.payload,
        listOffset: 0,
        enterLoading: true,
      }) as any
    case actionTypes.CHANGE_CATOGORY:
      return state.merge({
        category: action.payload,
        listOffset: 0,
        enterLoading: true,
      }) as any
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('singerList', action.payload)
    case actionTypes.CHANGE_LIST_OFFSET:
      return state.set('listOffset', action.payload)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.payload)
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.payload)
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.payload)
    default:
      return state
  }
}

export default reducer
