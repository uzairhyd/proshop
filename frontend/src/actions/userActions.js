import axios from 'axios';
import {
    USER_LOGIN_REQEUST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGOUT
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({
            type: USER_LOGIN_REQEUST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login',
            {'username': email, 'password': password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
              type: PRODUCT_DETAILS_FAIL,
              payload: error.response && error.response.data.detail 
                    ? error.response.data.detail 
                    : error.message,
            });
    }
}