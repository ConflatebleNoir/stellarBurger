import OrderList from '../../components/OrderList/OrderList';
import OrdersInformation from '../../components/OrdersInformation/OrdersInformation';
import { wsOrdersConnectionClosed, wsOrdersConnectionStart } from '../../services/actions/generalOrders';
import { useDispatch } from '../../services/hooks/hooks';
import FeedStyles from './Feed.module.css'
import { FC, useEffect } from 'react'

const Feed: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsOrdersConnectionStart());

        return () => {
            dispatch(wsOrdersConnectionClosed())
        };

    }, [dispatch])
    return (
        <section className={FeedStyles.container}>
            <OrderList />
            <OrdersInformation />
        </section>
    )
}

export default Feed;