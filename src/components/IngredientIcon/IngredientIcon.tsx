import { FC } from 'react';
import { useSelector } from '../../services/hooks/hooks';
import { IIngredient, IIngredientIcon } from '../../services/types/types';
import IngredientIconStyles from './IngredientIcon.module.css'

const IngredientIcon: FC<IIngredientIcon> = ({ order, index, item, count }) => {
    const ingredientsList = useSelector(state => state.ingredientsData.ingredientsList);
    const { ingredients } = order;
    const shift = index && IngredientIconStyles[`shift-${index}`]

    const extractIngredient = (item: string, ingredients: IIngredient[]) => {
        return ingredients.find((extractedItem: IIngredient) => extractedItem._id === item);
    };

    const computeCount = () => {
        let count = 0;
        if (ingredients) {
            count += ingredients.length - 5;
        };

        return count;
    };

    return (
        <div className={`${IngredientIconStyles.image} ${shift}`}>
            <div className={IngredientIconStyles.overlay}>
                {
                    count && (
                        <span className={`${IngredientIconStyles.count} text text_type_main-default`}>
                            {`+${computeCount()}`}
                        </span>
                    )
                }
                <img
                    className={IngredientIconStyles.icon}
                    src={extractIngredient(item, ingredientsList)?.image}
                    alt={extractIngredient(item, ingredientsList)?.name}
                />
            </div>
        </div>
    )
}

export default IngredientIcon;