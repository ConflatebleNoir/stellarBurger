import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    ingredientsData: ingredientsReducer,
    orderData: orderReducer,
    modalData: modalReducer,
    userData: userReducer,
});