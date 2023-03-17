import OrderListStyles from './OrderList.module.css'
import OrderPosition from '../OrderPosition/OrderPosition';
import { FC } from 'react';
import { useSelector } from '../../services/hooks/hooks';
import Loader from '../Loader/Loader';
import { IOrder } from '../../services/types/types';

const OrderList: FC = () => {
    const ordersList = useSelector((state) => state.generalOrders.orders);
    console.log(useSelector((state) => state.generalOrders.orders));
    return (
        <div className={OrderListStyles.orders__wrapper}>
            <h1 className='mt-10 mb-5 text text_type_main-large'>Лента заказов</h1>
            <div className={OrderListStyles.list__container}>
                {ordersList.length > 0
                    ? (
                        <ul className={OrderListStyles.list}>
                            {
                                ordersList?.map((order: IOrder, index: number) => (
                                    <OrderPosition key={index} order={order} isNavigate={false} />
                                ))
                            }
                        </ul>
                    )
                    : (<Loader />)
                }
            </div>
        </div>
    )
};

export default OrderList;