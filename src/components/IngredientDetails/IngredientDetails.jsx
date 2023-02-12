import React from 'react'
import { useSelector } from 'react-redux'
import IngredientDetailsStyles from './IngredientDetails.module.css'

const IngredientDetails = () => {
    const modalIngredient = useSelector(state => state.ingredientsData.modalIngredient);

    return (
        <>
            <img className={IngredientDetailsStyles.image} src={modalIngredient && modalIngredient.image} alt={modalIngredient.name} />
            <h3 className='text text_type_main-medium mt-4'>{modalIngredient && modalIngredient.name}</h3>
            <ul className={IngredientDetailsStyles.list + ' ' + 'mt-8'}>
                <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Калории,ккал {modalIngredient.calories}</li>
                <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Белки, г {modalIngredient.proteins}</li>
                <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Жиры, г {modalIngredient.fat}</li>
                <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Углеводы, г {modalIngredient.carbohydrates}</li>
            </ul>
        </>
    )
}

export default IngredientDetails;