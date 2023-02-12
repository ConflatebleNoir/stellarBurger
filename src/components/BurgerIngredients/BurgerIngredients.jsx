import { useState } from 'react'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import {
    Counter,
    CurrencyIcon,
    Tab,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import {
    addIngredient,
    modalIngredient,
} from '../../services/actions/ingredients'
import { switchIngredientsModalState } from '../../services/actions/modal'
import { useDrag } from 'react-dnd'
import { checkCoordinates } from '../../utils/checkCoordinates'
import { numberType, stringType } from '../../utils/types'

const BurgerIngredient = ({
    _id,
    name,
    price,
    image,
}) => {
    const dispatch = useDispatch();
    const currentIngredients = useSelector(state => state.ingredientsData.currentIngredients);
    const initIngredients = useSelector(state => state.ingredientsData.ingredientsList);

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: { _id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const handleSelectElement = (evt) => {
        evt.preventDefault();
        const currentItem = initIngredients.find(item => item._id === evt.currentTarget.getAttribute('id'));
        const currentBun = currentIngredients.find(item => item.type === 'bun');
        const indexOfBun = currentIngredients.indexOf(currentBun);

        if (currentItem.type === 'bun' && currentBun) {
            const currentIngredientsCopy = currentIngredients.slice();
            currentIngredientsCopy.splice(indexOfBun, 1, currentItem);
            dispatch(addIngredient(currentIngredientsCopy));
        } else {
            dispatch(addIngredient([...currentIngredients, currentItem]));
        }
    };

    let ingredientCounter = 0;

    currentIngredients.forEach((item) => {
        item.name === name
            && (item.type === 'bun'
                ? (ingredientCounter += 2)
                : (ingredientCounter += 1))
    });

    const handleModalIngredient = (evt) => {
        const id = evt.currentTarget.getAttribute('id');
        const ingredinetSearch = initIngredients.find((element) => element._id === id);
        dispatch(modalIngredient(ingredinetSearch));
        dispatch(switchIngredientsModalState(true));
    }

    return (
        <li
            ref={dragRef}
            id={_id}
            onClick={handleModalIngredient}
            onContextMenu={handleSelectElement}
            className={`${BurgerIngredientsStyles.list__item} ${isDrag && BurgerIngredientsStyles.dragging}`}>
            {ingredientCounter === 0 ? (<Counter count={0} size="default" extraClass="m-1" />) : ((<Counter count={ingredientCounter} size="default" extraClass="m-1" />))}
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

BurgerIngredient.propTypes = {
    _id: stringType.isRequired,
    name: stringType.isRequired,
    price: numberType.isRequired,
    image: stringType.isRequired,
}

function BurgerIngredients() {
    const initIngredients = useSelector(state => state.ingredientsData.ingredientsList);
    const [currentItem, setCurrentItem] = useState('bun');

    const handleTabClick = (currentItem) => {
        setCurrentItem(currentItem);
        document.querySelector(`#${currentItem}`).scrollIntoView({ block: "start", behavior: "smooth" })
    };

    const handleScroll = (evt) => {
        evt.target.addEventListener('scroll', () => {
            setCurrentItem(checkCoordinates(BurgerIngredientsStyles.container));
        });
    }

    return (
        <section className={BurgerIngredientsStyles.container}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div className={BurgerIngredientsStyles.tabs}>
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
            <div onScroll={handleScroll} className={BurgerIngredientsStyles.ingredient__container}>
                <h2 id='bun' className="text text_type_main-medium mt-10">Булки</h2>
                <ul className={BurgerIngredientsStyles.list + ' ' + 'mt-6 pl-4 pr-4'}>
                    {initIngredients.map((data) => (data.type === 'bun' && <BurgerIngredient key={data._id} {...data} />))}
                </ul>
                <h2 id='sauce' className="text text_type_main-medium mt-10">Соусы</h2>
                <ul className={BurgerIngredientsStyles.list + ' ' + 'mt-6 pl-4 pr-4'}>
                    {initIngredients.map((data) => (data.type === 'sauce' && <BurgerIngredient key={data._id} {...data} />))}
                </ul>
                <h2 id='main' className="text text_type_main-medium mt-10">Начинки</h2>
                <ul className={BurgerIngredientsStyles.list + ' ' + 'mt-6 pl-4 pr-4'}>
                    {initIngredients.map((data) => (data.type === 'main' && <BurgerIngredient key={data._id} {...data} />))}
                </ul>
            </div>
        </section>
    )
}

export default BurgerIngredients;