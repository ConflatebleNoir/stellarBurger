import { getIngredientsData } from '../../utils/api';
import { config } from '../../utils/constants';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

getIngredientsData(config)
  .then(res => {
    const result = res;
    console.log(result)
  })

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
}