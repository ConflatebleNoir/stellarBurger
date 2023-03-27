import {
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MODAL_INGREDIENT,
    REMOVE_MODAL_INGREDIENT,
    SORT_INGREDIENTS,
    REMOVE_ORDER_LIST,
} from '../actions/ingredients';
import { ingredientsReducer } from './ingredients';
import { defaultState } from './ingredients';

describe('ingredients_reducer', () => {

    it('have to return default state', () => {
        //@ts-ignore
        expect(ingredientsReducer(undefined, {})).toEqual(defaultState)
    })

    it('have to handle GET_INGREDIENTS_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            ingredientsRequest: true,
        }

        const action = {
            type: GET_INGREDIENTS_SUCCESS,
            payload: [{}],
        }

        expect(ingredientsReducer(prevState, action))
            .toEqual({
                ...prevState,
                ingredientsRequest: false,
                ingredientsList: action.payload,
            })
    })

    it('have to handle GET_INGREDIENTS_FAILED', () => {
        const prevState = {
            ...defaultState,
            ingredientsRequest: true,
        }

        const action = {
            type: GET_INGREDIENTS_FAILED,
        }

        expect(ingredientsReducer(prevState, action))
            .toEqual({
                ...prevState,
                ingredientsRequest: false,
                ingredientsFailed: true,
            })
    })

    it('have to handle GET_INGREDIENTS', () => {
        const action = {
            type: GET_INGREDIENTS,
        }

        expect(ingredientsReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                ingredientsRequest: true,
                ingredientsFailed: false,
            })
    })

    it('have to handle ADD_INGREDIENT', () => {
        const action = {
            type: ADD_INGREDIENT,
            payload: [{}],
        }

        expect(ingredientsReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                currentIngredients: action.payload,
            })
    })

    it('have to handle REMOVE_INGREDIENT', () => {
        const prevState = {
            ...defaultState,
            currentIngredients: [{ 1: 1 }, { 2: 2 },],
        }

        const action = {
            type: REMOVE_INGREDIENT,
            payload: [{ 1: 1 },],
        }
        //@ts-ignore
        expect(ingredientsReducer(prevState, action))
            .toEqual({
                ...prevState,
                currentIngredients: action.payload,
            })
    })

    it('have to handle REMOVE_ORDER_LIST', () => {
        const prevState = {
            ...defaultState,
            currentIngredients: [{}, {}],
        }

        const action = {
            type: REMOVE_ORDER_LIST,
        }
        //@ts-ignore
        expect(ingredientsReducer(prevState, action))
            .toEqual({
                ...prevState,
                currentIngredients: [],
            })
    })

    it('have to handle SORT_INGREDIENTS', () => {
        const prevState = {
            ...defaultState,
            currentIngredients: [{ 1: 1 }, { 2: 2 }, { 3: 3 },],
        }

        const action = {
            type: SORT_INGREDIENTS,
            payload: [{ 3: 3 }, { 1: 1 }, { 2: 2 },],
        }
        //@ts-ignore
        expect(ingredientsReducer(prevState, action))
            .toEqual({
                ...prevState,
                currentIngredients: action.payload,
            })
    })

    it('have to handle MODAL_INGREDIENT', () => {
        const action = {
            type: MODAL_INGREDIENT,
            payload: {},
        }

        expect(ingredientsReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                modalIngredient: action.payload,
            })
    })

    it('have to handle REMOVE_MODAL_INGREDIENT', () => {
        const prevState = {
            ...defaultState,
            modalIngredient: {},
        }

        const action = {
            type: REMOVE_MODAL_INGREDIENT,
            payload: null,
        }
        //@ts-ignore
        expect(ingredientsReducer(prevState, action))
            .toEqual({
                ...prevState,
                modalIngredient: action.payload,
            })
    })
})