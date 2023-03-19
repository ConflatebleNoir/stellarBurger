import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks/hooks'
import OrderInfoFullStyles from './OrderInfoFull.module.css'
import { FC, useEffect } from 'react'
import { IIngredient, IOrderInfoFullProps } from '../../services/types/types';
import { getOrderData } from '../../services/actions/generalOrders';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../Loader/Loader';

const OrderInfoFull: FC<IOrderInfoFullProps> = ({ isModal }) => {
    const dispatch = useDispatch();
    const { orderNumber } = useParams();
    const orderData = useSelector((state) => state.generalOrders.orderData);
    const ingredeintList = useSelector((state) => state.ingredientsData.ingredientsList);
    const extractedIngredients = orderData?.ingredients.map((orderIngredient: string) => ingredeintList.find((ingredient: IIngredient) => ingredient._id === orderIngredient));

    const computeSum = () => {
        let sum = 0;

        extractedIngredients?.forEach((ingredient: IIngredient | undefined) => {
            const orderedIngredient = ingredeintList.find((orderIngredient: IIngredient) => orderIngredient?._id === ingredient?._id);
            if (orderedIngredient?.price) {
                sum += orderedIngredient.price;
            }
        })
        return sum;
    }

    const checkoutStatus = (status: string) => {
        if (status === 'pending') {
            return 'Готовится';
        } else {
            return 'Выполнен';
        };
    };

    const checkoutStyle = (status: string) => {
        if (status === 'pending') {
            return { color: '#00CCCC' }
        } else {
            return {}
        }
    }

    const localeDate = (loc: string) => {
        return new Date(loc).toLocaleString();
    };

    useEffect(() => {
        orderNumber && dispatch(getOrderData(+orderNumber));
    }, [dispatch, orderNumber]);

    return (
        <>
            {
                orderData?.number ? (
                    <div className={OrderInfoFullStyles.container}>
                        {
                            isModal === true && (
                                <div className={OrderInfoFullStyles.order_info_modal}>
                                    <h2 className='text text_type_main-medium mt-10'>
                                        {orderData && orderData.name}
                                    </h2>
                                    <p className={`text text_type_main-default mt-3`} style={checkoutStyle(orderData?.status)}>
                                        {checkoutStatus(orderData?.status)}
                                    </p>
                                    <p className='text text_type_main-medium mt-15 mb-6'>Состав:</p>
                                    <ul className={OrderInfoFullStyles.list}>
                                        {
                                            Array.from(new Set(extractedIngredients))?.map((ingredient, index) => {
                                                return (
                                                    <li key={index} className={OrderInfoFullStyles.list_item}>
                                                        <img className={OrderInfoFullStyles.list_image} src={ingredient?.image} alt={ingredient?.name} />
                                                        <h3 className={`text text_type_main-default ${OrderInfoFullStyles.title}`}>
                                                            {ingredient?.name}
                                                        </h3>
                                                        <div className={`text text_type_digits-default ${OrderInfoFullStyles.item_currency}`}>
                                                            <span>
                                                                {extractedIngredients && extractedIngredients?.filter(item => item?._id === ingredient?._id).length}
                                                            </span>
                                                            x
                                                            <div className={OrderInfoFullStyles.currency_wrapper}>
                                                                <p>
                                                                    {ingredient?.price}
                                                                </p>
                                                                <CurrencyIcon type="primary" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <div className={OrderInfoFullStyles.order_footer}>
                                        <p className="text text_type_main-default text_color_inactive">{
                                            localeDate(orderData?.createdAt)
                                        }</p>
                                        <div className={OrderInfoFullStyles.currency_wrapper}>
                                            <span className='text text_type_digits-default'>{computeSum()}</span>
                                            <CurrencyIcon type='primary' />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            isModal === false && (
                                <div className={OrderInfoFullStyles.order_info}>
                                    <p
                                        className={`text text_type_digits-default ${OrderInfoFullStyles.order_number}`}>#{
                                            orderData && orderData.number
                                        }</p>
                                    <h2 className='text text_type_main-medium mt-10'>
                                        {orderData && orderData.name}
                                    </h2>
                                    <p className={`text text_type_main-default mt-3`} style={checkoutStyle(orderData?.status)}>
                                        {checkoutStatus(orderData?.status)}
                                    </p>
                                    <p className='text text_type_main-medium mt-15 mb-6'>Состав:</p>
                                    <ul className={OrderInfoFullStyles.list}>
                                        {
                                            Array.from(new Set(extractedIngredients))?.map((ingredient: IIngredient | undefined, index: number) => {
                                                return (
                                                    <li key={index} className={OrderInfoFullStyles.list_item}>
                                                        <img className={OrderInfoFullStyles.list_image} src={ingredient?.image} alt={ingredient?.name} />
                                                        <h3 className={`text text_type_main-default ${OrderInfoFullStyles.title}`}>
                                                            {ingredient?.name}
                                                        </h3>
                                                        <div className={`text text_type_digits-default ${OrderInfoFullStyles.item_currency}`}>
                                                            <span>
                                                                {extractedIngredients && extractedIngredients?.filter(item => item?._id === ingredient?._id).length}
                                                            </span>
                                                            x
                                                            <div className={OrderInfoFullStyles.currency_wrapper}>
                                                                <p>
                                                                    {ingredient?.price}
                                                                </p>
                                                                <CurrencyIcon type="primary" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <div className={OrderInfoFullStyles.order_footer}>
                                        <p className="text text_type_main-default text_color_inactive">{
                                            localeDate(orderData?.createdAt)
                                        }</p>
                                        <div className={OrderInfoFullStyles.currency_wrapper}>
                                            <span className='text text_type_digits-default'>{computeSum()}</span>
                                            <CurrencyIcon type='primary' />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div >
                )
                    : (<Loader />)
            }
        </>
    )
}

export default OrderInfoFull