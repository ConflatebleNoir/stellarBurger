import React, { useEffect, useState } from 'react'
import BurgerConstructorStyle from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'

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

const ConstructorList = ({
    items,
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
    const [bun, setBun] = useState(true);


    return (
        <div>
            {bun && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                    <ConstructorElement onClick={() => setBun(false)}
                        type="top"
                        isLocked={true}
                        text={name}
                        price={price}
                        thumbnail={image}
                    />
                    <CurrentIngredient />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={name}
                        price={price}
                        thumbnail={image}
                    />
                </div>
            )}
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
    console.log({ items })
    return (
        <section className={BurgerConstructorStyle.container + ' ' + 'pt-25'}>
            <ul className={BurgerConstructorStyle.list}>
                {items.map((data) => (<ConstructorList key={data._id} {...data} />))}
            </ul>
            <SummaryConstructor />
        </section>
    )
}

export default BurgerConstructor