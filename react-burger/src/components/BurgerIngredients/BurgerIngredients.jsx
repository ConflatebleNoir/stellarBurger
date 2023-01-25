import React, { useEffect, useState } from 'react'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import {
    Counter,
    CurrencyIcon,
    Tab,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredient = ({
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
    __v
}) => {
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
    const [currentItem, setCurrentItem] = useState('');

    const handleTabClick = (currentItem) => {
        setCurrentItem(currentItem)
        console.log(`#${currentItem}`)
        document.querySelector(`#${currentItem}`).scrollIntoView({ block: "start", behavior: "smooth" })
    }

    return (
        <section className={BurgerIngredientsStyles.container}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={currentItem === 'bun'} onClick={handleTabClick}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentItem === 'sauce'} onClick={handleTabClick}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentItem === 'main'} onClick={handleTabClick}>
                    Начинки
                </Tab>
            </div>
            <div className={BurgerIngredientsStyles.ingredient__container}>
                <h2 id='bun' className="text text_type_main-medium mt-10">Булки</h2>
                <ul className={BurgerIngredientsStyles.list + ' ' + 'mt-6 pl-4 pr-4'}>
                    {items.map((data) => (data.type === 'bun' && <BurgerIngredient key={data._id} {...data} />))}
                </ul>
                <h2 id='sauce' className="text text_type_main-medium mt-10">Соусы</h2>
                <ul className={BurgerIngredientsStyles.list + ' ' + 'mt-6 pl-4 pr-4'}>
                    {items.map((data) => (data.type === 'sauce' && <BurgerIngredient key={data._id} {...data} />))}
                </ul>
                <h2 id='main' className="text text_type_main-medium mt-10">Начинки</h2>
                <ul className={BurgerIngredientsStyles.list + ' ' + 'mt-6 pl-4 pr-4'}>
                    {items.map((data) => (data.type === 'main' && <BurgerIngredient key={data._id} {...data} />))}
                </ul>
            </div>
        </section>
    )
}

export default BurgerIngredients;