
import BurgerIngredientStyles from './BurgerIngredient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import {
    addIngredient,
    modalIngredient,
} from '../../services/actions/ingredients'
import { switchIngredientsModalState } from '../../services/actions/modal'
import { useDrag } from 'react-dnd'
import { numberType, stringType } from '../../utils/types'
import { useLocation, NavLink } from 'react-router-dom'

const BurgerIngredient = ({
    _id,
    name,
    price,
    image,
}) => {
    const dispatch = useDispatch();
    const currentIngredients = useSelector(state => state.ingredientsData.currentIngredients);
    const initIngredients = useSelector(state => state.ingredientsData.ingredientsList);
    const location = useLocation();

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
            className={`${BurgerIngredientStyles.list__item} ${isDrag && BurgerIngredientStyles.dragging}`}>
            <NavLink
                to={{
                    pathname: `/ingredients/${_id}`, state: { location }

                }}
                className={BurgerIngredientStyles.link}>
                {ingredientCounter === 0 ? (<Counter count={0} size="default" extraClass="m-1" />) : ((<Counter count={ingredientCounter} size="default" extraClass="m-1" />))}
                <div className={BurgerIngredientStyles.item__container}>
                    <img src={image} alt={name} />
                    <div className={BurgerIngredientStyles.currency__container + ' ' + 'pt-1 pb-1'}>
                        <p className="text text_type_digits-default">{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={BurgerIngredientStyles.text__align + ' ' + "text text_type_main-default"}>{name}</p>
                </div>
            </NavLink>
        </li>
    )
}

BurgerIngredient.propTypes = {
    _id: stringType.isRequired,
    name: stringType.isRequired,
    price: numberType.isRequired,
    image: stringType.isRequired,
}

export default BurgerIngredient