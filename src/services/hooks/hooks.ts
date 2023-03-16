import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
    useDispatch as dispatchHook,
} from 'react-redux'
import { AppDispatch, AppThunk, RootState } from '../types/types';
import type { } from "redux-thunk/extend-redux";

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;