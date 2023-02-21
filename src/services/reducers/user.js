import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
} from '../actions/user'

const defaultState = {
    userData: null,
    accessToken: null,
    loginRequest: false,
    loginRequestFailed: false,
}

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USER_LOGIN: {
            return {
                ...state,
                loginRequest: true,
                loginRequestFailed: false,
            };
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                accessToken: action.payload.accessToken,
                userData: action.payload.user
            }
        }
        case USER_LOGIN_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginRequestFailed: true,
            }
        }
        default: {
            return state;
        }
    }
}