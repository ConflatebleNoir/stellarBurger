import React from 'react'
import OrderDetailsStyles from './OrderDetails.module.css'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import doneIcon from '../../images/done.svg'

const OrderDetails = () => {
    return (
        <div className={OrderDetailsStyles.container + ' ' + 'pb-15'}>
            <h3 className={OrderDetailsStyles.title + ' ' + 'text text_type_digits-large pt-9'}>034536</h3>
            <p className='text text_type_main-medium pt-8'>идентификатор заказа</p>
            <img className='pt-15' src={doneIcon} alt="checkout" />
            <p className='text text_type_main-default pt-15'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive pt-2'>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails