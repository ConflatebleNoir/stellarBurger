import React, { useEffect, useState } from 'react'
import BurgerConstructorStyle from './BurgerConstructor.module.css'
import {
    ConstructorElement,
    CurrencyIcon,
    Button,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components'

const CurrentIngredient = ({ name, price, image }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <ConstructorElement
                isLocked={false}
                text={name}
                price={price}
                thumbnail={image}
            />
        </div>
    )
}

const SummaryConstructor = ({ price }) => {
    return (
        <div className={BurgerConstructorStyle.order + ' ' + 'pt-10'}>
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
            <ul className={BurgerConstructorStyle.list}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={img}
                    />
                </div>
                {items.map((data) => (<ConstructorList key={data._id} {...data} />))}
            </ul>
            <SummaryConstructor />
        </section>
    )
}

export default BurgerConstructor