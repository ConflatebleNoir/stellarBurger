import { findEmail, postLogin, postNewPassword, postRegister } from "../../utils/api";
import { config } from "../../utils/config";

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_REGISTRATION = 'USER_REGISTRATION';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SECCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const FORGOT_PASSWORD_STATE = 'FORGOT_PASSWORD_STATE';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';


export const setUserLoginLoading = () => ({ type: USER_LOGIN });
export const setUserLoginLoadingSuccess = (token) => ({ type: USER_LOGIN_SUCCESS, payload: token });
export const setUserLoginLoadingFailed = () => ({ type: USER_LOGIN_FAILED });

export const setUserRegistrationLoading = () => ({ type: USER_REGISTRATION });
export const setUserRegistrationSuccessLoading = (token) => ({ type: USER_REGISTRATION_SUCCESS, payload: token });
export const setUserRegistrationFailedLoading = () => ({ type: USER_REGISTRATION_FAILED });

export const setForgotPasswordLoading = () => ({ type: FORGOT_PASSWORD });
export const setForgotPasswordSuccessLoading = () => ({ type: FORGOT_PASSWORD_SUCCESS });
export const setForgotPasswordFailedLoading = () => ({ type: FORGOT_PASSWORD_FAILED });

export const setForgotPasswordState = (state) => ({ type: FORGOT_PASSWORD_STATE, payload: state, })


export const setResetPasswordLoading = () => ({ type: RESET_PASSWORD });
export const setResetPasswordSuccessLoading = () => ({ type: RESET_PASSWORD_SUCCESS });
export const setResetPasswordFailedLoading = () => ({ type: RESET_PASSWORD_FAILED });

export const signIn = (email, pass) => {
    return function (dispatch) {
        dispatch(setUserLoginLoading())

        postLogin(email, pass, config)
            .then(res => {
                dispatch(setUserLoginLoadingSuccess(res))
                localStorage.setItem('refreshToken', res.refreshToken)
            })
            .catch(error => {
                dispatch(setUserLoginLoadingFailed())
                console.log(`Ошибка: ${error}`)
            })
    }
};

export const signUp = (email, pass, name) => {
    return function (dispatch) {
        dispatch(setUserRegistrationLoading())

        postRegister(email, pass, name, config)
            .then(res => {
                dispatch(setUserRegistrationSuccessLoading(res))
                localStorage.setItem('refreshToken', res.refreshToken)
            })
            .catch(error => {
                dispatch(setUserRegistrationFailedLoading())
                console.log(`Ошибка: ${error}`)
            })
    }
};

export const forgotPassword = (email) => {
    return function (dispatch) {
        dispatch(setForgotPasswordLoading());

        findEmail(email, config)
            .then((res) => {
                console.log(res)
                setForgotPasswordSuccessLoading()
            })
            .catch(error => {
                dispatch(setForgotPasswordFailedLoading())
                console.log(`Ошибка: ${error}`)
            })
    }
}

export const resetPassword = (passValue, codeValue) => {
    return function (dispatch) {
        dispatch(setResetPasswordLoading());

        postNewPassword(passValue, codeValue, config)
            .then(() => {
                setResetPasswordSuccessLoading()
            })
            .catch(error => {
                dispatch(setResetPasswordFailedLoading())
                console.log(`Ошибка: ${error}`)
            })
    }
}