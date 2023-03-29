import { wsUserOrdersConnectionClosed, wsUserOrdersConnectionStart } from '../../services/actions/generalOrders';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import Loader from '../Loader/Loader';
import OrderPosition from '../OrderPosition/OrderPosition';
import OrderHistoryStyles from './OrderHistory.module.css'
import { FC, useEffect } from 'react';

const OrderHistory: FC = () => {
    const userOrders = useSelector((state) => state.generalOrders.userOrders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsUserOrdersConnectionStart());

        return () => {
            dispatch(wsUserOrdersConnectionClosed());
        }
    }, [dispatch]);

    return (
        <ul className={OrderHistoryStyles.list}>
            {
                userOrders.length > 0 ? (
                    <>
                        {
                            userOrders.map((order, index) => (
                                <OrderPosition key={index} isNavigate={true} order={order} />
                            ))
                        }
                    </>
                ) : (<Loader />)
            }
        </ul>
    )
}

export default OrderHistory;