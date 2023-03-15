import { ThunkAction } from "redux-thunk";
import {
    IAddIngredient,
    IModalIngredient,
    IRemoveIngredient,
    IRemoveModalIngredient,
    IRemoveOrderList,
    ISortIngredients,
} from "../actions/ingredients";
import {
    IGetOrderData,
    IGetOrderDataFailed,
    IGetOrderDataSuccess,
    IRemoveOrderData,
} from "../actions/order";
import {
    ISwitchIngredientsModalState,
    ISwitchOrderModalState
} from "../actions/modal";
import {
    IForgotPassword,
    IForgotPasswordFailed,
    IForgotPasswordState,
    IForgotPasswordSuccess,
    IGetUserData,
    IGetUserDataFailed,
    IGetUserDataSuccess,
    ILogout,
    ILogoutFailed,
    ILogoutSuccess,
    IPatchUserData,
    IPatchUserDataFailed,
    IPatchUserDataSuccess,
    IRefreshToken,
    IRefreshTokenFailed,
    IRefreshTokenSuccess,
    IResetPassword,
    IResetPasswordFailed,
    IResetPasswordSuccess,
    IUserLogin,
    IUserLoginFailed,
    IUserLoginSuccess,
    IUserRegistration,
    IUserRegistrationFailed,
    IUserRegistrationSuccess
} from "../actions/user";
import {
    IWSOrdersConnectionStart,
    IWSUserOrdersConnectionStart
} from "../actions/generalOrders";
import { store } from "../store";
import { Action, ActionCreator } from "redux"

export interface ITakeCoordinates {
    top: number,
};

export interface ICheckCoordinates {
    name: string,
    value: number,
};

export interface IIngredient {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    pseudoUuid: number,
};

export type TIngredientTypes = Pick<IIngredient, 'type'>;
export type TIngredientID = Pick<IIngredient, '_id'>;

export interface IBurgerConstructorProps {
    onDropHandler: (elementId: IIngredient) => void,
};

export interface ICurrentIngredientProps {
    item: IIngredient,
    id: string,
    index: number,
    shiftElement: (dragIndex: number, hoverIndex: number) => void,
};

export interface IIngredientProps {
    _id: IIngredient['_id'],
    name: IIngredient['name'],
    price: IIngredient['price'],
    image: IIngredient['image'],
};

export interface IIngredientDetailsProps {
    heading?: string,
};

export interface IModalProps {
    handleModalClose: () => void,
    title?: string,
};

export interface IModalOverlayProp {
    handleModalClose: () => void,
};

export interface IProtectedRouteProps {
    children: React.ReactElement,
    anonymous?: boolean,
};

export interface IOrder {
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    _id: string,
    createdAt: string,
    updatedAt: string,
};

export interface IUser {
    email: string,
    name: string,
};

export interface IWSActions {
    wsInitial: string,
    onOpen: string,
    onClose: string,
    onError: string,
    onMessage: string,
};

export interface ISummaryCount {
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    ingredientsList: Array<object>,
    modalIngredient: object | null,
    currentIngredients: Array<object>,
};

export interface IModal {
    isOrderModalOpen: boolean,
    isIngredientModalOpen: boolean,
};

export interface IOrderPositionProps {
    order: IOrder,
    isNavigate: boolean,
}

export interface IOrderState {
    orderRequestSuccess: boolean,
    orderRequestFailed: boolean,
    orderDetails: Array<object> | null,
};

export interface IUserState {
    userData: Array<object> | null,
    accessToken: string | null,
    loginRequest: boolean,
    loginRequestFailed: boolean,
    registrationRequest: boolean,
    registrationRequestFailed: boolean,
    forgotPasswordRequest: boolean,
    forgotPasswordRequestFailed: boolean,
    isPassForgot: boolean,
    resetPasswordRequest: boolean,
    resetPasswordRequestFailed: boolean,
    logoutRequest: boolean,
    logoutRequestFailed: boolean,
    refreshTokenRequest: boolean,
    refreshTokenRequestFailed: boolean,
    getUserDataRequest: boolean,
    getUserDataRequestFailed: boolean,
    patchUserDataRequest: boolean,
    patchUserDataRequestFailed: boolean,
};

export interface IGeneralOrdersState {
    wsGeneralOrders: boolean,
    wsUserOrders: boolean,
    orders: IOrder[],
    userOrders: IOrder[],
    generalOrdersError?: Event,
    userOrdersError?: Event,
    total: number,
    totalToday: number,
    orderDataRequestSuccess: boolean,
    orderDataRequestFailed: boolean,
    orderData: IOrder | null,
};

export type RootState = ReturnType<typeof store.getState>;
export type TAvailableActions =
    | IAddIngredient
    | IRemoveIngredient
    | IModalIngredient
    | IRemoveModalIngredient
    | ISortIngredients
    | IRemoveOrderList
    | IGetOrderData
    | IGetOrderDataSuccess
    | IGetOrderDataFailed
    | IRemoveOrderData
    | ISwitchOrderModalState
    | ISwitchIngredientsModalState
    | IUserLogin
    | IUserLoginSuccess
    | IUserLoginFailed
    | IUserRegistration
    | IUserRegistrationSuccess
    | IUserRegistrationFailed
    | IForgotPassword
    | IForgotPasswordSuccess
    | IForgotPasswordFailed
    | IResetPassword
    | IResetPasswordSuccess
    | IResetPasswordFailed
    | ILogout
    | ILogoutSuccess
    | ILogoutFailed
    | IRefreshToken
    | IRefreshTokenSuccess
    | IRefreshTokenFailed
    | IGetUserData
    | IGetUserDataSuccess
    | IGetUserDataFailed
    | IPatchUserData
    | IPatchUserDataSuccess
    | IPatchUserDataFailed
    | IForgotPasswordState
    | IWSOrdersConnectionStart
    | IWSUserOrdersConnectionStart;


export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAvailableActions>>