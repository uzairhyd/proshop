import {
    USER_LOGIN_REQEUST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGOUT
} from '../constants/userConstants'

export const userLoginReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQEUST:
      return { loading: true};
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILED:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return { };

    default:
      return state;
  }
}