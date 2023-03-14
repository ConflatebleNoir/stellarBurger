import { getIngredientsData } from '../../utils/api';
import { AppDispatch, AppThunk, IIngredient } from '../types/types';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';

export const MODAL_INGREDIENT: 'MODAL_INGREDIENT' = 'MODAL_INGREDIENT';
export const REMOVE_MODAL_INGREDIENT: 'REMOVE_MODAL_INGREDIENT' = 'REMOVE_MODAL_INGREDIENT';

export const SORT_INGREDIENTS: 'SORT_INGREDIENTS' = 'SORT_INGREDIENTS';

export const REMOVE_ORDER_LIST: 'REMOVE_ORDER_LIST' = 'REMOVE_ORDER_LIST';

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: IIngredient[];
};

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly payload: IIngredient[];
};

export interface IModalIngredient {
  readonly type: typeof MODAL_INGREDIENT;
  readonly payload: IIngredient;
};

export interface IRemoveModalIngredient {
  readonly type: typeof REMOVE_MODAL_INGREDIENT;
};

export interface ISortIngredients {
  readonly type: typeof SORT_INGREDIENTS;
};

export interface IRemoveOrderList {
  readonly type: typeof REMOVE_ORDER_LIST;
};

export const removeOrderList = () => ({ type: REMOVE_ORDER_LIST });

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });

    getIngredientsData()
      .then((ingredientsData) => {
        if (ingredientsData) {
          console.log(ingredientsData.data)
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: ingredientsData.data,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
      })
  }
};

export const addIngredient = (newArr: IIngredient[]) => {
  function getRandom() {
    return Math.random();
  };
  const updatedIngredientList = newArr.map((item) => {
    const ingredientCopy = Object.assign({}, item);
    ingredientCopy.pseudoUuid = getRandom();
    return ingredientCopy;
  });
  return {
    type: ADD_INGREDIENT,
    payload: updatedIngredientList,
  };
};

export const removeIngredient = (newArr: IIngredient[]) => ({
  type: REMOVE_INGREDIENT,
  payload: newArr,
});

export const modalIngredient = (selectedIngredient: IIngredient) => ({
  type: MODAL_INGREDIENT,
  payload: selectedIngredient,
});

export const removeModalIngredient = () => ({
  type: REMOVE_MODAL_INGREDIENT,
});

export const sortIngredients = (newArr: IIngredient[]) => ({
  type: SORT_INGREDIENTS,
  payload: newArr,
})