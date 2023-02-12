import { getIngredientsData } from '../../utils/api';
import { config, getRandom } from '../../utils/config';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const MODAL_INGREDIENT = 'MODAL_INGREDIENT';
export const REMOVE_MODAL_INGREDIENT = 'REMOVE_MODAL_INGREDIENT';

export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });

    getIngredientsData(config)
      .then((ingredientsData) => {
        if (ingredientsData) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: ingredientsData.data,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
      })
  }
};

export const addIngredient = (newArr) => {
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

export const removeIngredient = (newArr) => ({
  type: REMOVE_INGREDIENT,
  payload: newArr,
});

export const modalIngredient = (selectedIngredient) => ({
  type: MODAL_INGREDIENT,
  payload: selectedIngredient,
});

export const removeModalIngredient = () => ({
  type: REMOVE_MODAL_INGREDIENT,
});

export const sortIngredients = (newArr) => ({
  type: SORT_INGREDIENTS,
  payload: newArr,
})