import { useMemo } from 'react'
import SummaryConstructorStyle from './SummaryConstructor.module.css'
import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../services/actions/order'
import { switchOrderModalState } from '../../services/actions/modal'

const SummaryConstructor = () => {
    const dispatch = useDispatch();
    const currentIngredients = useSelector(state => state.ingredientsData.currentIngredients);

    const summaryPrice = useMemo(() => currentIngredients.reduce((acc, cur) => cur.type === 'bun' ? acc + (cur.price * 2) : acc + cur.price, 0), [currentIngredients]);

    const handleOrderByClick = () => {
        const elemId = currentIngredients.map(element => element._id);
        dispatch(getOrder(elemId));
        dispatch(switchOrderModalState(true));
    };

    return (
        <div className={SummaryConstructorStyle.order__summary + ' ' + 'pt-10'}>
            <div className={SummaryConstructorStyle.currency__wrapper + ' ' + 'mr-10'}>
                <p className="text text_type_digits-medium">{summaryPrice}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button
                onClick={handleOrderByClick}
                disabled={currentIngredients.length > 0 ? false : true}
                htmlType="button"
                type="primary"
                size="medium"
            >
                Оформить заказ
            </Button>
        </div>
    )
}

export default SummaryConstructor;