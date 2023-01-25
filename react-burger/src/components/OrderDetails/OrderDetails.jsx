import React from 'react'
import OrderDetailsStyles from './OrderDetails.module.css'

const OrderDetails = () => {
    return (
        <>
            <div className={OrderDetailsStyles.container + ' ' + 'pt-30 pb-30'}>
                <h3 className='text text_type_digits-large pt-15'>034536</h3>
                <p className='text text_type_main-medium pt-8'>идентификатор заказа</p>
                <img className='pt-15' src="../../images/done.svg" alt="checkout" />
                <p>Ваш заказ начали готовить</p>
                <p>Дождитесь готовности на орбитальной станции</p>
            </div>
        </>
    );
};

export default OrderDetails