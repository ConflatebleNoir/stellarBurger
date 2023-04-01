import { ThunkAction } from "redux-thunk";
import {
    IAddIngredient,
    IGetIngredients,
    IGetIngredientsFailed,
    IGetIngredientsSuccess,
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
    ISwitchOrderFeedModalState,
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
    IGetOrderInfo,
    IGetOrderInfoFailed,
    IGetOrderInfoSuccess,
    IWSConnectionClosed,
    IWSConnectionError,
    IWSConnectionSuccess,
    IWSGetOrders,
    IWSGetUserOrders,
    IWSOrdersConnectionStart,
    IWSUserOrdersConnectionClosed,
    IWSUserOrdersConnectionError,
    IWSUserOrdersConnectionStart,
    IWSUserOrdersConnectionSuccess,
    IWSWipeOrderData
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
    pseudoUuid: number,
    __v: string,
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
    number?: boolean,
};

export interface IModalOverlayProp {
    handleModalClose: () => void,
};

export interface IProtectedRouteProps {
    children: JSX.Element,
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

export interface IDefaultOrder {
    name: string,
    order: {
        createdAt: string,
        ingredients: IIngredient[],
        name: string,
        number: number,
        price: number,
        status: string,
        updatedAt: string,
        _id: string,
    },
    success: boolean,
}

export interface IUser {
    user: {
        email: string,
        name: string,
    },
    accessToken: string,
};

export interface IWSActions {
    wsInitial: string,
    onOpen: string,
    onClose: string,
    onError: string,
    onMessage: string,
};

export interface IIngredientsState {
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    ingredientsList: IIngredient[],
    modalIngredient: IIngredient | null,
    currentIngredients: IIngredient[],
};

export interface IModal {
    isOrderModalOpen: boolean,
    isIngredientModalOpen: boolean,
    isOrderFeedModalOpen: boolean,
};

export interface IOrderPositionProps {
    order: IOrder,
    isNavigate: boolean,
};

export interface IOrderInfoFullProps {
    isModal: boolean,
}

export interface IOrderState {
    orderRequestSuccess: boolean,
    orderRequestFailed: boolean,
    orderDetails: object | null,
};

export interface IIngredientIcon {
    order: IOrder,
    index: number,
    item: string,
    count: number | boolean,
}

export interface IUserState {
    userData: object | null,
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
    | IGetIngredients
    | IGetIngredientsSuccess
    | IGetIngredientsFailed
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
    | ISwitchOrderFeedModalState
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
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSConnectionClosed
    | IWSOrdersConnectionStart
    | IWSGetOrders
    | IWSGetUserOrders
    | IWSWipeOrderData
    | IWSUserOrdersConnectionStart
    | IWSUserOrdersConnectionSuccess
    | IWSUserOrdersConnectionError
    | IWSUserOrdersConnectionClosed
    | IGetOrderInfo
    | IGetOrderInfoSuccess
    | IGetOrderInfoFailed;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<
        TReturn,
        Action,
        RootState,
        TAvailableActions
    >
>