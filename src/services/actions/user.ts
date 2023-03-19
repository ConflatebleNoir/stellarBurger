import {
    findEmail,
    postLogin,
    postNewPassword,
    postRegister,
    postLogout,
    postRefreshToken,
    getUserData,
    patchUserInfo,
} from "../../utils/api";
import { AppDispatch, AppThunk, IUser } from "../types/types";

export const USER_LOGIN: 'USER_LOGIN' = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS' = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED: 'USER_LOGIN_FAILED' = 'USER_LOGIN_FAILED';

export const USER_REGISTRATION: 'USER_REGISTRATION' = 'USER_REGISTRATION';
export const USER_REGISTRATION_SUCCESS: 'USER_REGISTRATION_SUCCESS' = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED: 'USER_REGISTRATION_FAILED' = 'USER_REGISTRATION_FAILED';

export const FORGOT_PASSWORD: 'FORGOT_PASSWORD' = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SECCESS' = 'FORGOT_PASSWORD_SECCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const FORGOT_PASSWORD_STATE: 'FORGOT_PASSWORD_STATE' = 'FORGOT_PASSWORD_STATE';

export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const LOGOUT: 'LOGOUT' = 'LOGOUT';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const REFRESH_TOKEN: 'REFRESH_TOKEN' = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

export const GET_USER_DATA: 'GET_USER_DATA' = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED';

export const PATCH_USER_DATA: 'PATCH_USER_DATA' = 'PATCH_USER_DATA';
export const PATCH_USER_DATA_SUCCESS: 'PATCH_USER_DATA_SUCCESS' = 'PATCH_USER_DATA_SUCCESS';
export const PATCH_USER_DATA_FAILED: 'PATCH_USER_DATA_FAILED' = 'PATCH_USER_DATA_FAILED';

export interface IUserLogin {
    readonly type: typeof USER_LOGIN;
};

export interface IUserLoginSuccess {
    readonly type: typeof USER_LOGIN_SUCCESS;
    payload: string;
};

export interface IUserLoginFailed {
    readonly type: typeof USER_LOGIN_FAILED;
    payload: string;
};

export interface IUserRegistration {
    readonly type: typeof USER_REGISTRATION;
};

export interface IUserRegistrationSuccess {
    readonly type: typeof USER_REGISTRATION_SUCCESS;
    payload: string;
};

export interface IUserRegistrationFailed {
    readonly type: typeof USER_REGISTRATION_FAILED;
};

export interface IForgotPassword {
    readonly type: typeof FORGOT_PASSWORD;
};

export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};

export interface IForgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
};

export interface IResetPassword {
    readonly type: typeof RESET_PASSWORD;
};

export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
};

export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
};

export interface ILogout {
    readonly type: typeof LOGOUT;
};

export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
};

export interface ILogoutFailed {
    readonly type: typeof LOGOUT_FAILED;
};

export interface IRefreshToken {
    readonly type: typeof REFRESH_TOKEN;
};

export interface IRefreshTokenSuccess {
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
    payload: string;
};

export interface IRefreshTokenFailed {
    readonly type: typeof REFRESH_TOKEN_FAILED;
};

export interface IGetUserData {
    readonly type: typeof GET_USER_DATA;
};

export interface IGetUserDataSuccess {
    readonly type: typeof GET_USER_DATA_SUCCESS;
    payload: IUser;
};

export interface IGetUserDataFailed {
    readonly type: typeof GET_USER_DATA_FAILED;
};

export interface IPatchUserData {
    readonly type: typeof PATCH_USER_DATA;
};

export interface IPatchUserDataSuccess {
    readonly type: typeof PATCH_USER_DATA_SUCCESS;
    payload: IUser;
};

export interface IPatchUserDataFailed {
    readonly type: typeof PATCH_USER_DATA_FAILED;
};

export interface IForgotPasswordState {
    readonly type: typeof FORGOT_PASSWORD_STATE;
    payload: boolean;
}

export const setUserLoginLoading = () => ({ type: USER_LOGIN });
export const setUserLoginLoadingSuccess = (token: string) => ({ type: USER_LOGIN_SUCCESS, payload: token });
export const setUserLoginLoadingFailed = () => ({ type: USER_LOGIN_FAILED });

export const setUserRegistrationLoading = () => ({ type: USER_REGISTRATION });
export const setUserRegistrationSuccessLoading = (token: string) => ({ type: USER_REGISTRATION_SUCCESS, payload: token });
export const setUserRegistrationFailedLoading = () => ({ type: USER_REGISTRATION_FAILED });

export const setForgotPasswordLoading = () => ({ type: FORGOT_PASSWORD });
export const setForgotPasswordSuccessLoading = () => ({ type: FORGOT_PASSWORD_SUCCESS });
export const setForgotPasswordFailedLoading = () => ({ type: FORGOT_PASSWORD_FAILED });

export const setForgotPasswordState = (state: boolean) => ({ type: FORGOT_PASSWORD_STATE, payload: state, })

export const setResetPasswordLoading = () => ({ type: RESET_PASSWORD });
export const setResetPasswordSuccessLoading = () => ({ type: RESET_PASSWORD_SUCCESS });
export const setResetPasswordFailedLoading = () => ({ type: RESET_PASSWORD_FAILED });

export const setLogoutLoading = () => ({ type: LOGOUT });
export const setLogoutSuccessLoading = () => ({ type: LOGOUT_SUCCESS });
export const setLogoutFailedLoading = () => ({ type: LOGOUT_FAILED });

export const setRefreshTokenLoading = () => ({ type: REFRESH_TOKEN });
export const setRefreshTokenSuccessLoading = (token: string) => ({ type: REFRESH_TOKEN_SUCCESS, payload: token, });
export const setRefreshTokenFailedLoading = () => ({ type: REFRESH_TOKEN_FAILED });

export const setGetUserDataLoading = () => ({ type: GET_USER_DATA });
export const setGetUserDataSuccessLoading = (userData: IUser) => ({ type: GET_USER_DATA_SUCCESS, payload: userData });
export const setGetUserDataFailedLoading = () => ({ type: GET_USER_DATA_FAILED });

export const setPatchUserDataLoading = () => ({ type: PATCH_USER_DATA });
export const setPatchUserDataSuccessLoading = (userData: IUser) => ({ type: PATCH_USER_DATA_SUCCESS, payload: userData });
export const setPatchUserDataFailedLoading = () => ({ type: PATCH_USER_DATA_FAILED });

export const signIn: AppThunk = (email: string, pass: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(setUserLoginLoading())

        postLogin(email, pass)
            .then(res => {
                //@ts-ignore
                dispatch(setUserLoginLoadingSuccess(res))
                // @ts-ignore
                localStorage.setItem('refreshToken', res.refreshToken)
            })
            .catch(error => {
                dispatch(setUserLoginLoadingFailed())
                console.log(`Ошибка: ${error}`)
            })
    }
};

export const signUp: AppThunk = (email: string, pass: string, name: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(setUserRegistrationLoading())

        postRegister(email, pass, name)
            .then(res => {
                //@ts-ignore
                dispatch(setUserRegistrationSuccessLoading(res.accessToken))
                //@ts-ignore
                localStorage.setItem('refreshToken', res.refreshToken)
            })
            .catch(error => {
                dispatch(setUserRegistrationFailedLoading())
                console.log(`Ошибка: ${error}`)
            })
    }
};

export const forgotPassword: AppThunk = (email: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(setForgotPasswordLoading());

        findEmail(email)
            .then(() => {
                setForgotPasswordSuccessLoading()
            })
            .catch(error => {
                dispatch(setForgotPasswordFailedLoading())
                console.log(`Ошибка: ${error}`)
            })
    }
}

export const resetPassword: AppThunk = (passValue: string, codeValue: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(setResetPasswordLoading());

        postNewPassword(passValue, codeValue)
            .then(() => {
                setResetPasswordSuccessLoading()
            })
            .catch(error => {
                dispatch(setResetPasswordFailedLoading())
                console.log(`Ошибка: ${error}`)
            })
    }
}

const refreshToken: AppThunk = (refreshToken: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(setRefreshTokenLoading())

        postRefreshToken(refreshToken)
            .then((res) => {
                //@ts-ignore
                localStorage.setItem('refreshToken', res.refreshToken);
                //@ts-ignore
                dispatch(setRefreshTokenSuccessLoading(res.accessToken));
            })
            .catch(error => {
                dispatch(setRefreshTokenFailedLoading());
                console.log(`Ошибка: ${error}`);
            })
    }
};

export const logout: AppThunk = (refreshToken: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(setLogoutLoading())

        postLogout(refreshToken)
            .then(() => {
                dispatch(setLogoutSuccessLoading());
                localStorage.removeItem('refreshToken');
            })
            .catch(error => {
                dispatch(setLogoutFailedLoading());
                console.log(`Ошибка: ${error}`);
            })
    }
};

export const reachUserData: AppThunk = (accessToken: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(setGetUserDataLoading())

        getUserData(accessToken)
            .then((res) => {
                //@ts-ignore
                dispatch(setGetUserDataSuccessLoading(res.user))
            })
            .catch(error => {
                dispatch(setGetUserDataFailedLoading());
                if (error.status === '403' || error.status === '401') {
                    //@ts-ignore
                    dispatch(refreshToken(localStorage.getItem('refreshToken'), 'reachUserData'))
                }
                console.log(`Ошибка: ${error}`);
            })
    }
};

export const updateUserData: AppThunk = (name: string, email: string, password: string, accessToken: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(setPatchUserDataLoading())

        patchUserInfo(name, email, password, accessToken)
            .then((res) => {
                // @ts-ignore
                dispatch(setPatchUserDataSuccessLoading(res.user));
            })
            .catch(error => {
                dispatch(setPatchUserDataFailedLoading());
                if (error.status === '403' || error.status === '401') {
                    //@ts-ignore
                    dispatch(refreshToken(localStorage.getItem('refreshToken')))
                }
                console.log(`Ошибка: ${error}`);
            })
    }
}