import React from 'react'
import PropTypes from 'prop-types'
import IngredientDetailsStyles from './IngredientDetails.module.css'

const IngredientDetails = ({ image, name, calories, proteins, fat, carbohydrates }) => {
    return (
        <>
            <img className={IngredientDetailsStyles.image} src={image} alt={name} />
            <h3 className='text text_type_main-medium mt-4'>{name}</h3>
            <ul className={IngredientDetailsStyles.list + ' ' + 'mt-8'}>
                < li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Калории,ккал {calories}</li>
                <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Белки, г {proteins}</li>
                <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Жиры, г {fat}</li>
                <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Углеводы, г {carbohydrates}</li>
            </ul>
        </>
    )
}

IngredientDetails.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}

export default IngredientDetails;