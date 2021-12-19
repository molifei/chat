import {auth} from '@/api'
import {LOGIN, LOGOUT} from '@/store/actionTypes'
import {delA, saveS} from '@/utils/tools';
import {message} from 'antd'

export const getLoginAction = (value) => ({
  type: LOGIN,
  value
})

export const getLogin = (value) => {

  return async(dispatch) => {
    try {
      const res = await auth.getLogin(value)

      console.log(res)
      let {data: {data}} = res

      if (data.msg !== 'success') {
        message.error('请刷新重试')
        return false
      }

      saveS('userData', data, 2)

      dispatch(getLoginAction(data))

      return true
    } catch (e) {
      return false
    }

  }
}

export const getLogoutAction = (value) => ({
  type: LOGOUT,
  value
})

export const getLogout = () => {
  return async(dispatch) => {
    delA(2)

    dispatch(getLogoutAction({}))

    return true
  }
}
