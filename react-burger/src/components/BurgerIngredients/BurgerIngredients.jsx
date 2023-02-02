import { useState } from 'react'
import PropTypes from 'prop-types'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import {
    Counter,
    CurrencyIcon,
    Tab,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'

const BurgerIngredient = ({
    name,
    proteins,
    fat,
    carbohydrates,
    calories,
    price,
    image,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <li onClick={() => { setOpen(true) }} className={BurgerIngredientsStyles.list__item}>
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
            {open && (
                <Modal
                    open={open}
                    onClose={() => { setOpen(false) }}
                    title={'Детали ингредиента'}
                    children={<IngredientDetails
                        image={image}
                        name={name}
                        calories={calories}
                        proteins={proteins}
                        fat={fat}
                        carbohydrates={carbohydrates}
                    />}
                />
            )}
        </>

    )
}

BurgerIngredient.propTypes = {
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}

function BurgerIngredients({ items }) {
    const [currentItem, setCurrentItem] = useState('bun');


    const handleTabClick = (currentItem) => {
        setCurrentItem(currentItem);
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

BurgerIngredients.propTypes = {
    items: PropTypes.array.isRequired
}

export default BurgerIngredients;