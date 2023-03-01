import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import IngredientDetailsStyles from './IngredientDetails.module.css'


const IngredientDetails = ({ heading }) => {
    const ingredients = useSelector(state => state.ingredientsData.ingredientsList)
    const { id } = useParams();

    const modalIngredient = ingredients.find(item => item._id === id);

    return (
        <>
            {
                modalIngredient && (
                    <section className={IngredientDetailsStyles.container}>
                        {heading && <h2 className={`${IngredientDetailsStyles.title} text text_type_main-large`}>{heading}</h2>}
                        <img className={IngredientDetailsStyles.image} src={modalIngredient && modalIngredient.image} alt={modalIngredient.name} />
                        <h3 className='text text_type_main-medium mt-4'>{modalIngredient && modalIngredient.name}</h3>
                        <ul className={IngredientDetailsStyles.list + ' ' + 'mt-8'}>
                            <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Калории,ккал
                                <span className='text text_type_main-default text_color_inactive'>{modalIngredient.calories}</span>
                            </li>
                            <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Белки, г
                                <span className='text text_type_main-default text_color_inactive'>{modalIngredient.proteins}</span>
                            </li>
                            <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Жиры, г
                                <span className='text text_type_main-default text_color_inactive'>{modalIngredient.fat}</span>
                            </li>
                            <li className={IngredientDetailsStyles.list__item + ' ' + 'text text_type_main-default text_color_inactive'}>Углеводы, г
                                <span className='text text_type_main-default text_color_inactive'>{modalIngredient.carbohydrates}</span>
                            </li>
                        </ul>
                    </section>
                )
            }
        </>
    )
}

export default IngredientDetails;