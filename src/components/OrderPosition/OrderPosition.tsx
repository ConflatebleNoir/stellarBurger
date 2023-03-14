import OrderPositionStyles from './OrderPosition.module.css'
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react';
import { useSelector } from 'react-redux';

const OrderPosition: FC = () => {
    const ordersList = useSelector
    const location = useLocation();
    const
    return (
        <li>
            <Link
                className={OrderPositionStyles.link}
                to={{
                    pathname: ,
                    state: ,
                }}>
                <div className={OrderPositionStyles.service_info}>
                    <p></p>
                    <p></p>
                </div>
                <h2></h2>
                <div className={ }>
                    <ul></ul>
                    <div className={ }>
                        <p></p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
        </li>
    )
};

export default OrderPosition;