import { postLogin } from "../../utils/api";
import { config } from "../../utils/config";

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const setUserLoginLoading = () => ({ type: USER_LOGIN });
export const setUserLoginLoadingSuccess = (token) => ({ type: USER_LOGIN_SUCCESS, payload: token });
export const setUserLoginLoadingFailed = () => ({ type: USER_LOGIN_FAILED });

export const signIn = (email, pass) => {
    return function (dispatch) {
        dispatch(setUserLoginLoading())

        postLogin(email, pass, config)
            .then(res => {
                dispatch(setUserLoginLoadingSuccess(res))
                //
            })
            .catch(error => {
                dispatch(setUserLoginLoadingFailed())
                console.log(`Ошибка: ${error}`)
            })

    }
}