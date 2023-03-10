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

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';

export const PATCH_USER_DATA = 'PATCH_USER_DATA';
export const PATCH_USER_DATA_SUCCESS = 'PATCH_USER_DATA_SUCCESS';
export const PATCH_USER_DATA_FAILED = 'PATCH_USER_DATA_FAILED';

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

export const setLogoutLoading = () => ({ type: LOGOUT });
export const setLogoutSuccessLoading = () => ({ type: LOGOUT_SUCCESS });
export const setLogoutFailedLoading = () => ({ type: LOGOUT_FAILED });

export const setRefreshTokenLoading = () => ({ type: REFRESH_TOKEN });
export const setRefreshTokenSuccessLoading = (token) => ({ type: REFRESH_TOKEN_SUCCESS, payload: token, });
export const setRefreshTokenFailedLoading = () => ({ type: REFRESH_TOKEN_FAILED });

export const setGetUserDataLoading = () => ({ type: GET_USER_DATA });
export const setGetUserDataSuccessLoading = (userData) => ({ type: GET_USER_DATA_SUCCESS, payload: userData });
export const setGetUserDataFailedLoading = () => ({ type: GET_USER_DATA_FAILED });

export const setPatchUserDataLoading = () => ({ type: PATCH_USER_DATA });
export const setPatchUserDataSuccessLoading = (userData) => ({ type: PATCH_USER_DATA_SUCCESS, payload: userData });
export const setPatchUserDataFailedLoading = () => ({ type: PATCH_USER_DATA_FAILED });

export const signIn = (email, pass) => {
    return function (dispatch) {
        dispatch(setUserLoginLoading())

        postLogin(email, pass)
            .then(res => {
                dispatch(setUserLoginLoadingSuccess(res))
                localStorage.setItem('refreshToken', res.refreshToken)
            })
            .catch(error => {
                dispatch(setUserLoginLoadingFailed())
                console.log(`????????????: ${error}`)
            })
    }
};

export const signUp = (email, pass, name) => {
    return function (dispatch) {
        dispatch(setUserRegistrationLoading())

        postRegister(email, pass, name)
            .then(res => {
                dispatch(setUserRegistrationSuccessLoading(res.accessToken))
                localStorage.setItem('refreshToken', res.refreshToken)
            })
            .catch(error => {
                dispatch(setUserRegistrationFailedLoading())
                console.log(`????????????: ${error}`)
            })
    }
};

export const forgotPassword = (email) => {
    return function (dispatch) {
        dispatch(setForgotPasswordLoading());

        findEmail(email)
            .then(() => {
                setForgotPasswordSuccessLoading()
            })
            .catch(error => {
                dispatch(setForgotPasswordFailedLoading())
                console.log(`????????????: ${error}`)
            })
    }
}

export const resetPassword = (passValue, codeValue) => {
    return function (dispatch) {
        dispatch(setResetPasswordLoading());

        postNewPassword(passValue, codeValue)
            .then(() => {
                setResetPasswordSuccessLoading()
            })
            .catch(error => {
                dispatch(setResetPasswordFailedLoading())
                console.log(`????????????: ${error}`)
            })
    }
}

const refreshToken = (refreshToken) => {
    return function (dispatch) {
        dispatch(setRefreshTokenLoading())

        postRefreshToken(refreshToken)
            .then((res) => {
                localStorage.setItem('refreshToken', res.refreshToken);
                dispatch(setRefreshTokenSuccessLoading(res.accessToken));
            })
            .catch(error => {
                dispatch(setRefreshTokenFailedLoading());
                console.log(`????????????: ${error}`);
            })
    }
};

export const logout = (refreshToken) => {
    return function (dispatch) {
        dispatch(setLogoutLoading())

        postLogout(refreshToken)
            .then((res) => {
                dispatch(setLogoutSuccessLoading());
                localStorage.removeItem('refreshToken');
            })
            .catch(error => {
                dispatch(setLogoutFailedLoading());
                console.log(`????????????: ${error}`);
            })
    }
};

export const reachUserData = (accessToken) => {
    return function (dispatch) {
        dispatch(setGetUserDataLoading())

        getUserData(accessToken)
            .then((res) => {
                dispatch(setGetUserDataSuccessLoading(res.user))
            })
            .catch(error => {
                dispatch(setGetUserDataFailedLoading());
                if (error.status === '403' || error.status === '401') {
                    dispatch(refreshToken(localStorage.getItem('refreshToken'), 'reachUserData'))
                }
                console.log(`????????????: ${error}`);
            })
    }
};

export const updateUserData = (name, email, password, accessToken) => {
    return function (dispatch) {
        dispatch(setPatchUserDataLoading())

        patchUserInfo(name, email, password, accessToken)
            .then((res) => {
                dispatch(setPatchUserDataSuccessLoading(res.user));
            })
            .catch(error => {
                dispatch(setPatchUserDataFailedLoading());
                if (error.status === '403' || error.status === '401') {
                    dispatch(refreshToken(localStorage.getItem('refreshToken')))
                }
                console.log(`????????????: ${error}`);
            })
    }
}