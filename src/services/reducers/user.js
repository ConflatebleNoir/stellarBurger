import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_REGISTRATION,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILED,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_STATE,
} from '../actions/user'

const defaultState = {
    userData: null,
    accessToken: null,
    loginRequest: false,
    loginRequestFailed: false,
    registrationRequest: false,
    registrationRequestFailed: false,
    forgotPasswordRequest: false,
    forgotPasswordRequestFailed: false,
    isPassForgot: false,
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
            };
        }
        case FORGOT_PASSWORD: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordRequestFailed: false,
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
            };
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordRequestFailed: true,
            }
        }
        case FORGOT_PASSWORD_STATE: {
            return {
                ...state,
                isPassForgot: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}