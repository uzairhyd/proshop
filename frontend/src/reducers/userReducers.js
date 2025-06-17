import {
    USER_LOGIN_REQEUST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    
    USER_LOGOUT,

    USER_REGISTER_REQEUST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQEUST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    USER_UPDATE_PROFILE_REQEUST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET
    
} from '../constants/userConstants'

export const userLoginReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQEUST:
      return { loading: true};
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return { };

    default:
      return state;
  }
}






export const userRegisterReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQEUST:
      return { loading: true};
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return { };

    default:
      return state;
  }
}


export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQEUST:
      return {...state, loading: true};
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

export const userUpdateProfileReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQEUST:
      return { loading: true};
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    
    case USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
}