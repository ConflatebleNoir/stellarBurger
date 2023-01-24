import React from 'react'
import BurgerConstructorStyle from './BurgerConstructor.module.css'
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components'

const CurrentIngredient = ({ name, price, image }) => {
    return (
        <li className={BurgerConstructorStyle.list__item}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
            />
        </li>
    )
}

const SummaryConstructor = ({ price }) => {
    return (
        <div className={BurgerConstructorStyle.order__summary + ' ' + 'pt-10'}>
            <div className={BurgerConstructorStyle.currency__wrapper + ' ' + 'mr-10'}>
                <p className="text text_type_digits-medium">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium">
                Оформить заказ
            </Button>
        </div>)
}

const BurgerConstructor = ({ items }) => {
    // console.log({ items })
    return (
        <section className={BurgerConstructorStyle.container + ' ' + 'pt-25'}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1255}
                    thumbnail={items.image}
                />
                <ul className={BurgerConstructorStyle.order__list}>
                    {items.map((data) => (data.type !== 'bun' && <CurrentIngredient key={data._id} {...data} />))}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={1255}
                    thumbnail={items.image}
                />
            </div>
            <SummaryConstructor />
        </section>
    )
}

export default BurgerConstructor