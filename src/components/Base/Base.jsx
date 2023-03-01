import { useEffect } from 'react'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BaseStyles from './Base.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient, getIngredients } from '../../services/actions/ingredients.js'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Base = () => {
    const dispatch = useDispatch();
    const initIngredients = useSelector(state => state.ingredientsData.ingredientsList);
    const currentIngredients = useSelector(state => state.ingredientsData.currentIngredients);

    // useEffect(() => {
    //     dispatch(getIngredients());
    // }, [dispatch]);

    const handleDrop = (itemId) => {
        const currentItem = initIngredients.find(item => item._id === itemId._id);
        const currentBun = currentIngredients.find(item => item.type === 'bun');
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