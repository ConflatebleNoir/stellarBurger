import OrderPositionStyles from './OrderPosition.module.css'
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react';
import { IIngredient, IOrderPositionProps } from '../../services/types/types';
import { useSelector } from '../../services/hooks/hooks';

const OrderPosition: FC<IOrderPositionProps> = ({ order, isNavigate }) => {
    const ingredientsList = useSelector(state => state.ingredientsData.ingredientsList);
    const location = useLocation();
    const { ingredients, status, name, number, createdAt } = order;

    const extractIngredient = (item: string, ingredients: IIngredient[]) => {
        return ingredients.find((extractedItem: IIngredient) => extractedItem._id === item);
    };

    const checkoutStatus = (status: string) => {
        if (status === 'done') {
            return 'Создан'
        };
        return null;
    };

    const localeDate = (loc: string) => {
        return new Date(loc).toLocaleString();
    };

    const computeSum = () => {
        let sum = 0;

        ingredients.forEach((item: string) => {
            const detectedIngredient = ingredientsList.find((ingredient: IIngredient) => ingredient._id === item);

            if (detectedIngredient?.price) {
                sum += detectedIngredient.price;
            };
        });
        return sum;
    };

    return (
        <li>
            <Link
                className={OrderPositionStyles.link}
                to={{
                    pathname: `${location.pathname}/${number}`,
                    state: { background: location },
                }}>
                <div className={OrderPositionStyles.service_info}>
                    <p className='text text_type_digits-default'>{`#${number}`}</p>
                    <p className='text text_type_main-default text_color_inactive'>{localeDate(createdAt)}</p>
                </div>
                <h2 className='text text_type_main-medium'>{name}</h2>
                {
                    (status && isNavigate)
                    && <p className='text text_type_main-default'>{checkoutStatus(status)}</p>
                }
                <div className={OrderPositionStyles.order_summary}>
                    <ul className={OrderPositionStyles.order_ingredients}>
                        {
                            ingredients.map((item, index) => {
                                // const extractedIngredient = extractIngredient(item, ingredientsList);
                                if (index < 5) {
                                    return (
                                        <li key={index} className={OrderPositionStyles.order_ingredients_item}>
                                            <img
                                                src={extractIngredient(item, ingredientsList)?.image}
                                                alt={extractIngredient(item, ingredientsList)?.name}
                                            />
                                        </li>
                                    )
                                }
                                return null;
                            })
                        }
                    </ul>
                    <div className={OrderPositionStyles.summary}>
                        <p className='text text_type_digits-default'>{computeSum()}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
        </li>
    )
};

export default OrderPosition;