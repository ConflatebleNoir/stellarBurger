import { useRef, FC } from 'react'
import CurrentIngredientStyle from './CurrentIngredient.module.css'
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { removeIngredient } from '../../services/actions/ingredients'
import { ICurrentIngredientProps, IIngredient } from '../../services/types/types'

const CurrentIngredient: FC<ICurrentIngredientProps> = ({ item, id, index, shiftElement }) => {
    const ref = useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();
    const currentIngredients = useSelector((state: Array<object> | any) => state.ingredientsData.currentIngredients);
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
            // @ts-ignore
            const dragItemIndex = item.index;
            const hoverIndex = index;

            if (dragItemIndex === hoverIndex) {
                return;
            }

            const hoverBoundering = ref.current.getBoundingClientRect();
            const hoverCenterY = (hoverBoundering.bottom - hoverBoundering.top) / 2;
            const clientOffset = monitor.getClientOffset();
            // @ts-ignore
            const hoverClientY = clientOffset.y - clientOffset.top;

            if (dragItemIndex < hoverIndex && hoverClientY < hoverCenterY) {
                return;
            }

            if (dragItemIndex > hoverIndex && hoverClientY > hoverCenterY) {
                return;
            }

            shiftElement(dragItemIndex - 1, hoverIndex - 1);
            // @ts-ignore
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    const opacity = isDrag ? 0 : 1;

    const handleRemoveElement = (element: IIngredient) => () => {
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

export default CurrentIngredient