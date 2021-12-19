import {getS} from '../utils/tools'
import {cloneDeep} from 'lodash'
import {LOGIN, LOGOUT} from './actionTypes'

const userData = getS('userData', 2) || {}

const defaultState = {
  userData
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  let newState

  switch (action.type) {
  case LOGIN:
    newState = cloneDeep(state)
    newState.userData = action.value
    return newState
  case LOGOUT:
    newState = cloneDeep(state)
    newState.userData = action.value
    return newState
  default:
    break
  }

  return state;
}
