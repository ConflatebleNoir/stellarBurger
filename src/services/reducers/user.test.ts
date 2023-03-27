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
import { userReducer } from './user'
import { defaultState } from './user'

describe('user_reducer', () => {
    it('have to return default state', () => {
        //@ts-ignore
        expect(userReducer(undefined, {})).toEqual(defaultState)
    })

    it('have to handle USER_LOGIN', () => {
        const action = {
            type: USER_LOGIN,
        }

        expect(userReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                loginRequest: true,
                loginRequestFailed: false,
            })
    })

    it('have to handle USER_LOGIN_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            loginRequest: true,
        }

        const action = {
            type: USER_LOGIN_SUCCESS,
            payload: {
                accessToken: 'accessToken',
                user: {},
            }
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                loginRequest: false,
                accessToken: action.payload.accessToken,
                userData: action.payload.user,
            })
    })

    it('have to handle USER_LOGIN_FAILED', () => {
        const prevState = {
            ...defaultState,
            loginRequest: true,
        }

        const action = {
            type: USER_LOGIN_FAILED,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                loginRequest: false,
                loginRequestFailed: true,
            })
    })

    it('have to handle USER_REGISTRATION', () => {
        const action = {
            type: USER_REGISTRATION,
        }

        expect(userReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                registrationRequest: true,
                registrationRequestFailed: false,
            })
    })

    it('have to handle USER_REGISTRATION_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            registrationRequest: true,
        }

        const action = {
            type: USER_REGISTRATION_SUCCESS,
            payload: 'accessToken',
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                registrationRequest: false,
                accessToken: action.payload,
            })
    })

    it('have to handle USER_REGISTRATION_FAILED', () => {
        const prevState = {
            ...defaultState,
            registrationRequest: true,
        }

        const action = {
            type: USER_REGISTRATION_FAILED,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                registrationRequest: false,
                registrationRequestFailed: true,
            })
    })

    it('have to handle FORGOT_PASSWORD', () => {
        const action = {
            type: FORGOT_PASSWORD,
        }

        expect(userReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                forgotPasswordRequest: true,
                forgotPasswordRequestFailed: false,
            })
    })

    it('have to handle FORGOT_PASSWORD_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            forgotPasswordRequest: true,
        }

        const action = {
            type: FORGOT_PASSWORD_SUCCESS,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                forgotPasswordRequest: false,
            })
    })

    it('have to handle FORGOT_PASSWORD_FAILED', () => {
        const prevState = {
            ...defaultState,
            forgotPasswordRequest: true,
        }

        const action = {
            type: FORGOT_PASSWORD_FAILED,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                forgotPasswordRequest: false,
                forgotPasswordRequestFailed: true,
            })
    })

    it('have to handle FORGOT_PASSWORD_STATE', () => {
        const action = {
            type: FORGOT_PASSWORD_STATE,
            payload: true
        }

        expect(userReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                isPassForgot: action.payload,
            })
    })

    it('have to handle RESET_PASSWORD', () => {
        const action = {
            type: RESET_PASSWORD,
        }

        expect(userReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                resetPasswordRequest: true,
                resetPasswordRequestFailed: false,
            })
    })

    it('have to handle RESET_PASSWORD_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            resetPasswordRequest: true,
        }
        const action = {
            type: RESET_PASSWORD_SUCCESS,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                resetPasswordRequest: false,
            })
    })

    it('have to handle RESET_PASSWORD_FAILED', () => {
        const prevState = {
            ...defaultState,
            resetPasswordRequest: true,
        }
        const action = {
            type: RESET_PASSWORD_FAILED,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                resetPasswordRequest: false,
                resetPasswordRequestFailed: true,
            })
    })

    it('have to handle LOGOUT', () => {
        const action = {
            type: LOGOUT,
        }

        expect(userReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                logoutRequest: true,
                logoutRequestFailed: false,
            })
    })

    it('have to handle LOGOUT_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            logoutRequest: true,
            userData: {},
            accessToken: 'accessToken',
        }

        const action = {
            type: LOGOUT_SUCCESS,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                logoutRequest: false,
                userData: null,
                accessToken: null,
            })
    })

    it('have to handle LOGOUT_FAILED', () => {
        const prevState = {
            ...defaultState,
            logoutRequest: true,
        }

        const action = {
            type: LOGOUT_FAILED,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                logoutRequest: false,
                logoutRequestFailed: true,
            })
    })

    it('have to handle REFRESH_TOKEN', () => {
        const action = {
            type: REFRESH_TOKEN,
        }

        expect(userReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                refreshTokenRequest: true,
                refreshTokenRequestFailed: false,
            })
    })

    it('have to handle REFRESH_TOKEN_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            refreshTokenRequest: true,
        }

        const action = {
            type: REFRESH_TOKEN_SUCCESS,
            payload: 'accessToken',
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                refreshTokenRequest: false,
                accessToken: action.payload,
            })
    })

    it('have to handle REFRESH_TOKEN_FAILED', () => {
        const prevState = {
            ...defaultState,
            refreshTokenRequest: true,
        }

        const action = {
            type: REFRESH_TOKEN_FAILED,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                refreshTokenRequest: false,
                refreshTokenRequestFailed: true,
            })
    })

    it('have to handle GET_USER_DATA', () => {
        const action = {
            type: GET_USER_DATA,
        }

        expect(userReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                getUserDataRequest: true,
                getUserDataRequestFailed: false,
            })
    })

    it('have to handle GET_USER_DATA_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            getUserDataRequest: true,
        }

        const action = {
            type: GET_USER_DATA_SUCCESS,
            payload: {},
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                getUserDataRequest: false,
                userData: action.payload,
            })
    })

    it('have to handle GET_USER_DATA_FAILED', () => {
        const prevState = {
            ...defaultState,
            getUserDataRequest: true,
        }

        const action = {
            type: GET_USER_DATA_FAILED,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                getUserDataRequest: false,
                getUserDataRequestFailed: true,
            })
    })

    it('have to handle PATCH_USER_DATA', () => {
        const action = {
            type: PATCH_USER_DATA,
        }

        expect(userReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                patchUserDataRequest: true,
                patchUserDataRequestFailed: false,
            })
    })

    it('have to handle PATCH_USER_DATA_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            patchUserDataRequest: true,
        }

        const action = {
            type: PATCH_USER_DATA_SUCCESS,
            payload: {},
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                patchUserDataRequest: false,
                userData: action.payload,
            })
    })

    it('have to handle PATCH_USER_DATA_FAILED', () => {
        const prevState = {
            ...defaultState,
            patchUserDataRequest: true,
        }

        const action = {
            type: PATCH_USER_DATA_FAILED,
        }

        expect(userReducer(prevState, action))
            .toEqual({
                ...prevState,
                patchUserDataRequest: false,
                patchUserDataRequestFailed: true,
            })
    })
})