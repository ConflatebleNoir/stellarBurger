import React from 'react'
import BurgerConstructorStyle from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Icons } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'

const ConstructorList = ({
    _id,
    name,
    type,
    proteins,
    fat,
    carbohydrates,
    calories,
    price,
    image,
    image_mobile,
    image_large,
    __v,
    isLocked }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={price}
                thumbnail={image}
            />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
            />
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={price}
                thumbnail={image}
            />
        </div>
    )
}

const BurgerConstructor = ({ items }) => {
    return (
        <section className={BurgerConstructorStyle.container}>
            <ul className={BurgerConstructorStyle.list}>
                {items.map((data) => (<ConstructorList key={data._id} {...data} />))}
            </ul>
        </section>
    )
}

export default BurgerConstructor