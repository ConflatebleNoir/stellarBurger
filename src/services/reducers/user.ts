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
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    REFRESH_TOKEN,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    PATCH_USER_DATA,
    PATCH_USER_DATA_SUCCESS,
    PATCH_USER_DATA_FAILED,
} from '../actions/user'
import { IUserState, TAvailableActions } from '../types/types';

export const defaultState: IUserState = {
    userData: null,
    accessToken: null,
    loginRequest: false,
    loginRequestFailed: false,
    registrationRequest: false,
    registrationRequestFailed: false,
    forgotPasswordRequest: false,
    forgotPasswordRequestFailed: false,
    isPassForgot: false,
    resetPasswordRequest: false,
    resetPasswordRequestFailed: false,
    logoutRequest: false,
    logoutRequestFailed: false,
    refreshTokenRequest: false,
    refreshTokenRequestFailed: false,
    getUserDataRequest: false,
    getUserDataRequestFailed: false,
    patchUserDataRequest: false,
    patchUserDataRequestFailed: false,
}

export const userReducer = (state = defaultState, action: TAvailableActions): IUserState => {
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
                //@ts-ignore
                accessToken: action.payload.accessToken,
                //@ts-ignore
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
                registrationRequestFailed: true,
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
            };
        }
        case FORGOT_PASSWORD_STATE: {
            return {
                ...state,
                isPassForgot: action.payload,
            };
        }
        case RESET_PASSWORD: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordRequestFailed: false,
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordRequestFailed: true,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                logoutRequest: true,
                logoutRequestFailed: false,
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                userData: null,
                accessToken: null,
            };
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutRequestFailed: true,
            };
        }
        case REFRESH_TOKEN: {
            return {
                ...state,
                refreshTokenRequest: true,
                refreshTokenRequestFailed: false,
            };
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                refreshTokenRequest: false,
                accessToken: action.payload,
            };
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenRequestFailed: true,
            };
        }
        case GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                getUserDataRequest: false,
                userData: action.payload,
            };
        }
        case GET_USER_DATA_FAILED: {
            return {
                ...state,
                getUserDataRequest: false,
                getUserDataRequestFailed: true,
            }
        }
        case GET_USER_DATA: {
            return {
                ...state,
                getUserDataRequest: true,
                getUserDataRequestFailed: false,
            };
        }
        case PATCH_USER_DATA: {
            return {
                ...state,
                patchUserDataRequest: true,
                patchUserDataRequestFailed: false,
            };
        }
        case PATCH_USER_DATA_SUCCESS: {
            return {
                ...state,
                patchUserDataRequest: false,
                userData: action.payload,
            };
        }
        case PATCH_USER_DATA_FAILED: {
            return {
                ...state,
                patchUserDataRequest: false,
                patchUserDataRequestFailed: true,
            }
        }
        default: {
            return state;
        }
    }
}