import { FC, useState, MouseEvent } from 'react'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { checkCoordinates } from '../../utils/checkCoordinates'
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient'
import { IIngredient } from '../../services/types/types'
import { useSelector } from '../../services/hooks/hooks'

const BurgerIngredients: FC = () => {
    const initIngredients = useSelector((state) => state.ingredientsData.ingredientsList);
    const [currentItem, setCurrentItem] = useState('bun');

    const handleTabClick = (currentItem: string) => {
        setCurrentItem(currentItem);
        document.querySelector<HTMLElement>(`#${currentItem}`)?.scrollIntoView({ block: "start", behavior: "smooth" })
    };

    const handleScroll = (evt: MouseEvent<HTMLDivElement>) => {
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