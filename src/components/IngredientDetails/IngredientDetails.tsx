import { useParams } from 'react-router-dom';
import IngredientDetailsStyles from './IngredientDetails.module.css'
import { FC } from 'react';
import { IIngredientDetailsProps, IIngredient } from '../../services/types/types';
import { useSelector } from '../../services/hooks/hooks';


const IngredientDetails: FC<IIngredientDetailsProps> = ({ heading }) => {
    const ingredients = useSelector((state) => state.ingredientsData.ingredientsList)
    const { id } = useParams();

    const modalIngredient = ingredients.find((item) => item._id === id);

    const content = modalIngredient && (
        <>
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
        </>
    );

    return (
        <>
            {
                modalIngredient && (
                    <section className={IngredientDetailsStyles.container}>
                        {heading && (
                            <div className={IngredientDetailsStyles.wrapper_wheading}>
                                <h2 className={`${IngredientDetailsStyles.title} text text_type_main-large`}>{heading}</h2>
                                {content}
                            </div>
                        )}
                        {!heading && content}
                    </section>
                )
            }
        </>
    )
}

export default IngredientDetails;