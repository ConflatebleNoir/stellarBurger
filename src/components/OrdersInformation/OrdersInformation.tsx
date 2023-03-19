import { FC } from 'react'
import { useSelector } from '../../services/hooks/hooks'
import OrdersInformationStyles from './OrdersInformation.module.css';
import Loader from '../Loader/Loader';
import { IOrder } from '../../services/types/types';

export const OrdersInformation: FC = () => {
    const total = useSelector((state) => state.generalOrders.total);
    const totalToday = useSelector((state) => state.generalOrders.totalToday);
    const ordersList = useSelector((state) => state.generalOrders.orders);

    return (
        <div className={`${OrdersInformationStyles.container} mt-25`}>
            {
                ordersList.length > 0
                    ? (
                        <>
                            <div className={OrdersInformationStyles.order_statistics}>
                                {
                                    ordersList?.some((order) => order.status === 'done') && (
                                        <div className={OrdersInformationStyles.done}>
                                            <p className='text text_type_main-medium'>Готовы:</p>
                                            <div className={`${OrdersInformationStyles.statistics_container} mt-6`}>
                                                <ul className={OrdersInformationStyles.list_accent}>
                                                    {
                                                        ordersList?.map((order, index) => {
                                                            if (index < 10 && order.status === 'done') {
                                                                return (<li key={index} className='text text_type_digits-default'>
                                                                    {order.number}
                                                                </li>)
                                                            }
                                                            return null
                                                        })
                                                    }
                                                </ul>
                                                <ul className={OrdersInformationStyles.list_accent}>
                                                    {
                                                        ordersList?.map((order, index) => {
                                                            if (index >= 10 && index < 20 && order.status === 'done') {
                                                                return (<li key={index} className='text text_type_digits-default'>
                                                                    {order.number}
                                                                </li>)
                                                            }
                                                            return null
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    ordersList?.some((order: IOrder) => order.status === 'pending') && (
                                        <div className={OrdersInformationStyles.inprogress}>
                                            <p className='text text_type_main-medium pb-6'>В работе:</p>
                                            <ul className={OrdersInformationStyles.list}>
                                                {
                                                    ordersList?.map((order, index) => {
                                                        if (index < 10 && order.status === 'pending') {
                                                            return (<li key={index} className='text text_type_digits-default'>
                                                                {order.number}
                                                            </li>)
                                                        }
                                                        return null;
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                            <div className={OrdersInformationStyles.statistics_wrapper}>
                                <h2 className='text text_type_main-medium'>
                                    Выполнено за все время:
                                </h2>
                                <p className={OrdersInformationStyles.digits + ' ' + 'text text_type_digits-large'}>
                                    {total}
                                </p>
                            </div>
                            <div className={OrdersInformationStyles.statistics_wrapper}>
                                <h2 className='text text_type_main-medium'>
                                    Выполнено за сегодня:
                                </h2>
                                <p className={OrdersInformationStyles.digits + ' ' + 'text text_type_digits-large'}>
                                    {totalToday}
                                </p>
                            </div>
                        </>
                    )
                    : (<Loader />)
            }
        </div>
    )
};

export default OrdersInformation;