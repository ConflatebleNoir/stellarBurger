import OrderListStyles from './OrderList.module.css'
import OrderPosition from '../OrderPosition/OrderPosition';

const OrderList = () => {
    return (
        <div className={OrderListStyles.orders__wrapper}>
            <h1 className={OrderListStyles.title}>Лента заказов</h1>
            <div className={OrderListStyles.list__container}>
                <ul className={OrderListStyles.list}>
                    <OrderPosition />
                </ul>
            </div>
        </div>
    )
};

export default OrderList;