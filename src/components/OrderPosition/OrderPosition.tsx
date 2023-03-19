import OrderPositionStyles from './OrderPosition.module.css'
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react';
import { IIngredient, IOrderPositionProps } from '../../services/types/types';
import { useSelector } from '../../services/hooks/hooks';
import IngredientIcon from '../IngredientIcon/IngredientIcon';

const OrderPosition: FC<IOrderPositionProps> = ({ order, isNavigate = false }) => {
    const ingredientsList = useSelector(state => state.ingredientsData.ingredientsList);
    const location = useLocation();
    const { ingredients, status, name, number, createdAt } = order;


    const checkoutStatus = (status: string) => {
        if (status === 'done') {
            return 'Создан';
        } else if (status === 'pending') {
            return 'Готовится';
        }
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
                to={`${location.pathname}/${number}`}
                state={{ background: location }}
            >
                <div className={OrderPositionStyles.service_info}>
                    <p className='text text_type_digits-default'>{`#${number}`}</p>
                    <p className='text text_type_main-default text_color_inactive'>{localeDate(createdAt)}</p>
                </div>
                <h2 className={`${OrderPositionStyles.title} text text_type_main-medium`}>{name}</h2>
                {
                    (status && isNavigate)
                    && <p className='text text_type_main-default'>{checkoutStatus(status)}</p>
                }
                <div className={OrderPositionStyles.order_summary}>
                    <ul className={OrderPositionStyles.order_ingredients}>
                        {
                            ingredients.map((item, index) => {
                                if (index >= 6) return;

                                return (
                                    <li key={index}>
                                        <IngredientIcon order={order} index={index} item={item} count={index === 5 && item.length - 6} />
                                    </li>
                                )
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