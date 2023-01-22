import React from 'react'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'

const TabPalette = () => {
    const [current, setCurrent] = React.useState('one')



    return (
        <div style={{ display: 'flex' }}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

const BurgerIngredient = ({
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
    __v
}) => {
    return (
        <li className={BurgerIngredientsStyles.list__item}>
            <Counter count={1} size="default" extraClass="m-1" />
            <div className={BurgerIngredientsStyles.item__container}>
                <img src={image} alt={name} />
                <div className={BurgerIngredientsStyles.currency__container}>
                    <p className="text text_type_main-default">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={BurgerIngredientsStyles.text__align + ' ' + "text text_type_main-default"}>{name}</p>
            </div>
        </li>
    )
}

function BurgerIngredients({ items }) {
    return (
        <section className={BurgerIngredientsStyles.container}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <TabPalette />
            <ul className={BurgerIngredientsStyles.list}>
                {items.map((data) => (<BurgerIngredient key={data._id} {...data} />))}
            </ul>
        </section>
    )
}

export default BurgerIngredients;