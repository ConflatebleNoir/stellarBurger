import { useState } from 'react'
import PropTypes from 'prop-types'
import BurgerConstructorStyle from './BurgerConstructor.module.css'
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import bunImage from '../../images/bun.svg'
import { useDispatch, useSelector } from 'react-redux'

const CurrentIngredient = ({ name, price, image }) => {
    const dispatch = useDispatch();
    const currentIngredients = useSelector(state => state.ingredientsData.currentIngredients);

    return (
        <li className={BurgerConstructorStyle.list__item + ' ' + 'mr-2'}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
            />
        </li>
    )
}

CurrentIngredient.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}

const SummaryConstructor = ({ price }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={BurgerConstructorStyle.order__summary + ' ' + 'pt-10'}>
                <div className={BurgerConstructorStyle.currency__wrapper + ' ' + 'mr-10'}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={() => { setOpen(true) }} htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
                <Modal
                    open={open}
                    onClose={() => { setOpen(false) }}
                    children={<OrderDetails />}
                />
            </div>
            {open && (
                <Modal
                    open={open}
                    onClose={() => { setOpen(false) }}
                    children={<OrderDetails />}
                />
            )}
        </>
    )
}

SummaryConstructor.propTypes = {
    price: PropTypes.number.isRequired
}

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const currentIngredients = useSelector(state => state.ingredientsData.currentIngredients)
    return (
        <section className={BurgerConstructorStyle.container + ' ' + 'pt-25'}>
            <div className={BurgerConstructorStyle.container__entrails}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1255}
                    thumbnail={bunImage}
                />
                <ul className={BurgerConstructorStyle.order__list}>
                    {currentIngredients.map((data) => (data.type !== 'bun' && <CurrentIngredient key={data._id} {...data} />))}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={1255}
                    thumbnail={bunImage}
                />
            </div>
            <SummaryConstructor price={610} />
        </section >
    )
}

export default BurgerConstructor