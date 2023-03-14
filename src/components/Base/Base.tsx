import { FC } from 'react'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BaseStyles from './Base.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient, getIngredients } from '../../services/actions/ingredients'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IIngredient } from '../../services/types/types'

const Base: FC = () => {
    const dispatch = useDispatch();
    const initIngredients = useSelector((state: Array<object> | any) => state.ingredientsData.ingredientsList);
    const currentIngredients = useSelector((state: Array<object> | any) => state.ingredientsData.currentIngredients);

    const handleDrop = (itemId: IIngredient) => {
        const currentItem = initIngredients.find((item: IIngredient) => item._id === itemId._id);
        const currentBun = currentIngredients.find((item: IIngredient) => item.type === 'bun');
        const currentBunIndex = currentIngredients.indexOf(currentBun);

        if (currentItem.type === 'bun' && currentBun) {
            const currentItemCopy = currentIngredients.slice();
            currentItemCopy.splice(currentBunIndex, 1, currentItem);
            dispatch(addIngredient(currentItemCopy));
        } else {
            dispatch(addIngredient([...currentIngredients, currentItem]));
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <main className={BaseStyles.main}>
                <BurgerIngredients />
                <BurgerConstructor onDropHandler={handleDrop} />
            </main>
        </DndProvider>
    )
}

export default Base;