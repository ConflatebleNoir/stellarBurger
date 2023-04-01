import { useMemo, FC } from 'react'
import SummaryConstructorStyle from './SummaryConstructor.module.css'
import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { getOrder } from '../../services/actions/order'
import { switchOrderModalState } from '../../services/actions/modal'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from '../../services/hooks/hooks'

const SummaryConstructor: FC = () => {
    const dispatch = useDispatch();
    const currentIngredients = useSelector((state) => state.ingredientsData.currentIngredients);
    const userData = useSelector((state) => state.userData.userData);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken')

    const summaryPrice = useMemo(
        () => currentIngredients.reduce(
            (acc, cur) =>
                cur.type === 'bun'
                    ? acc + (cur.price * 2)
                    : acc + cur.price, 0), [currentIngredients]);

    const handleOrderByClick = () => {
        const elemId = currentIngredients.map((element) => element._id);
        if (userData) {
            dispatch(getOrder(elemId, accessToken));
            dispatch(switchOrderModalState(true));
        } else {
            navigate('/login')
        }

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