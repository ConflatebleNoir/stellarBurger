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

    console.log({ type })
    return (
        <li className={BurgerIngredientsStyles.list__item}>
            <Counter count={1} size="default" extraClass="m-1" />
            <div className={BurgerIngredientsStyles.item__container}>
                <img src={image} alt={name} />
                <div className={BurgerIngredientsStyles.currency__container + ' ' + 'pt-1 pb-1'}>
                    <p className="text text_type_digits-default">{price}</p>
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
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <TabPalette />
            <h2 className="text text_type_main-medium pt-10 pb-6">Булки</h2>
            <ul className={BurgerIngredientsStyles.list + ' ' + 'pl-4 pr-4'}>
                {items.map((data) => (<BurgerIngredient key={data._id} {...data} />))}
            </ul>
        </section>
    )
}

export default BurgerIngredients;