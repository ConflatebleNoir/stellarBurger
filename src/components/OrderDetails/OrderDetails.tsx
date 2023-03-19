import OrderDetailsStyles from './OrderDetails.module.css'
import doneIcon from '../../images/done.svg'
import { FC } from 'react'
import { useSelector } from '../../services/hooks/hooks';


const OrderDetails: FC = () => {
    const orderData = useSelector((state) => state.orderData.orderDetails);

    return (
        <div className={OrderDetailsStyles.container + ' ' + 'pb-15'}>
            <h3 className={OrderDetailsStyles.title + ' ' + 'text text_type_digits-large pt-9'}>
                {
                    // @ts-ignore
                    orderData.order.number
                }
            </h3>
            <p className='text text_type_main-medium pt-8'>идентификатор заказа</p>
            <img className='pt-15' src={doneIcon} alt="checkout" />
            <p className={OrderDetailsStyles.text_reference + ' ' + 'text text_type_main-default pt-15'}>
                {
                    // @ts-ignore
                    orderData.success && (`Ваш ${orderData.name} начали готовить`)
                }
            </p>
            {
                // @ts-ignore
                orderData.success &&
                (<p className={OrderDetailsStyles.text_reference + ' ' + 'text text_type_main-default text_color_inactive pt-2'}>Дождитесь готовности на орбитальной станции</p>)
            }
        </div>
    );
};

export default OrderDetails