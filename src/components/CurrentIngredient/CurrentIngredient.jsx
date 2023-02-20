import { useRef } from 'react'
import CurrentIngredientStyle from './CurrentIngredient.module.css'
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { removeIngredient } from '../../services/actions/ingredients'
import { stringType, numberType, funcType, shapeType } from '../../utils/types'

const CurrentIngredient = ({ item, id, index, shiftElement }) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const currentIngredients = useSelector(state => state.ingredientsData.currentIngredients);
    const { image, price, name } = item;

    const [{ isDrag }, drag] = useDrag({
        type: 'currentIngredient',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const [{ handlerId }, drop] = useDrop({
        accept: "currentIngredient",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        drop(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragItemIndex = item.index;
            const hoverIndex = index;

            if (dragItemIndex === hoverIndex) {
                return;
            }

            const hoverBoundering = ref.current.getBoundingClientRect();
            const hoverCenterY = (hoverBoundering.bottom - hoverBoundering.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - clientOffset.top;

            if (dragItemIndex < hoverIndex && hoverClientY < hoverCenterY) {
                return;
            }

            if (dragItemIndex > hoverIndex && hoverClientY > hoverCenterY) {
                return;
            }

            shiftElement(dragItemIndex - 1, hoverIndex - 1);

            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    const opacity = isDrag ? 0 : 1;

    const handleRemoveElement = (element) => () => {
        const takenElementIndex = currentIngredients.indexOf(element);
        const currentIngredientsCopy = currentIngredients.slice();
        currentIngredientsCopy.splice(takenElementIndex, 1);
        dispatch(removeIngredient(currentIngredientsCopy));
    }

    return (
        <li
            className={CurrentIngredientStyle.list__item + ' ' + 'mr-2'}
            ref={ref}
            data-handler-id={handlerId}
            style={{ opacity }}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={handleRemoveElement(item)}
            />
        </li>
    )
}

CurrentIngredient.propTypes = {
    item: shapeType({
        name: stringType.isRequired,
        price: numberType.isRequired,
        image: stringType.isRequired,
        image_large: stringType.isRequired,
        image_mobile: stringType.isRequired,
        calories: numberType.isRequired,
        carbohydrates: numberType.isRequired,
        fat: numberType.isRequired,
        proteins: numberType.isRequired,
        type: stringType.isRequired,
        _id: stringType.isRequired,
    }),
    id: stringType.isRequired,
    index: numberType.isRequired,
    shiftElement: funcType.isRequired,
}

export default CurrentIngredient