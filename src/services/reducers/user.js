import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_REGISTRATION,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILED,
} from '../actions/user'

const defaultState = {
    userData: null,
    accessToken: null,
    loginRequest: false,
    loginRequestFailed: false,
    registrationRequest: false,
    registrationRequestFailed: false,
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
        case USER_REGISTRATION: {
            return {
                ...state,
                registrationRequest: true,
                registrationRequestFailed: false,
            };
        }
        case USER_REGISTRATION_SUCCESS: {
            return {
                ...state,
                registrationRequest: false,
                accessToken: action.payload,
            };
        }
        case USER_REGISTRATION_FAILED: {
            return {
                ...state,
                registrationRequest: false,
                registrationRequestFailed: false
            }
        }
        default: {
            return state;
        }
    }
}