import {
  loginByPhoneRequest,
  loginByVcodeRequest,
  sentVcodeRequest,
} from '../../../../api/request'
import * as actionTypes from './constants'

export const saveUserInfo = (data: any) => ({
  type: actionTypes.CHANGE_USER_INFO,
  data,
})

export const saveSentStatus = (data: any) => ({
  type: actionTypes.CHANGE_SENT_STATUS,
  data,
})

export const saveLoginStatus = (data: any) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  data,
})

export const loginByPhone = (phone: string, password: string) => {
  return (dispatch: (...args: any[]) => void) => {
    loginByPhoneRequest(phone, password)
      .then((res: any) => {
        dispatch(saveUserInfo(res))
      })
      .catch(() => {
        console.log('登录失败！')
      })
  }
}

export const loginByVcode = (phone: string, vcode: string) => {
  return (dispatch: (...args: any[]) => void) => {
    loginByVcodeRequest(phone, vcode)
      .then((res: any) => {
        if (res.code === 200) {
          dispatch(saveUserInfo(res))
          dispatch(saveLoginStatus(true))
        }
      })
      .catch(() => {
        console.log('登录失败！')
      })
  }
}

export const sentVcode = (phone: string) => {
  return (dispatch: (...args: any[]) => void) => {
    sentVcodeRequest(phone)
      .then((res: any) => {
        if (res.code === 200) {
          dispatch(saveSentStatus(true))
        }
      })
      .catch(() => {
        console.log('请求失败！')
      })
  }
}
