import { useCallback, useMemo, useRef } from 'react'
import update from 'immutability-helper';
import PropTypes from 'prop-types'
import BurgerConstructorStyle from './BurgerConstructor.module.css'
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { removeIngredient, sortIngredients } from '../../services/actions/ingredients'
import { getOrder } from '../../services/actions/order'
import { switchOrderModalState } from '../../services/actions/modal'

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
            className={BurgerConstructorStyle.list__item + ' ' + 'mr-2'}
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
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}

CurrentIngredient.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }),
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    shiftElement: PropTypes.func.isRequired,
}

const SummaryConstructor = () => {
    const dispatch = useDispatch();
    const currentIngredients = useSelector(state => state.ingredientsData.currentIngredients);

    const summaryPrice = useMemo(() => currentIngredients.reduce((acc, cur) => cur.type === 'bun' ? acc + (cur.price * 2) : acc + cur.price, 0), [currentIngredients]);

    const handleOrderByClick = () => {
        const elemId = currentIngredients.map(element => element._id);
        dispatch(getOrder(elemId));
        dispatch(switchOrderModalState(true));
    };

    return (
        <div className={BurgerConstructorStyle.order__summary + ' ' + 'pt-10'}>
            <div className={BurgerConstructorStyle.currency__wrapper + ' ' + 'mr-10'}>
                <p className="text text_type_digits-medium">{summaryPrice}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button
                onClick={handleOrderByClick}
                disabled={currentIngredients.length > 0 ? false : true}
                htmlType="button"
                type="primary"
                size="medium"
            >
                Оформить заказ
            </Button>
        </div>
    )
}

const BurgerConstructor = ({ onDropHandler }) => {
    const dispatch = useDispatch();
    const currentIngredients = useSelector(state => state.ingredientsData.currentIngredients);
    const bunHighlighter = (currentIngredients, boolValueTrue, boolValueFalse, prop) => currentIngredients.find(item => item.type === 'bun') ? `${(currentIngredients.find(item => item.type === 'bun'))[prop]} ${boolValueTrue}` : boolValueFalse;

    const [{ isHover }, ingredientsContainer] = useDrop({
        accept: 'ingredient',
        drop(elementId) {
            onDropHandler(elementId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const shiftElement = useCallback((dragIndex, hoverIndex) => {
        const elementTypeBun = currentIngredients.filter(element => element.type === 'bun');
        const elementNonBun = currentIngredients.filter(element => element.type !== 'bun');
        const sortedBase = update(elementNonBun, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, elementNonBun[dragIndex]],
            ],
        }, [elementNonBun]);
        const sortedElementsBun = [...elementTypeBun, sortedBase];
        dispatch(sortIngredients([...sortedElementsBun]));
    }, [currentIngredients, dispatch]);

    const containerBorder = isHover ? '#801ab3' : 'transparent';

    return (
        <DndProvider backend={HTML5Backend}>
            <section className={BurgerConstructorStyle.container + ' ' + 'pt-25'}>
                <div className={BurgerConstructorStyle.container__entrails} ref={ingredientsContainer} style={{ borderColor: containerBorder }}>
                    {
                        currentIngredients.length > 0
                            ? <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={bunHighlighter(currentIngredients, '(верх)', 'Переместите сюда', 'name')}
                                price={bunHighlighter(currentIngredients, '', '0', 'price')}
                                thumbnail={bunHighlighter(currentIngredients, '', '', 'image')}
                            />
                            : <p>Переместите сюда</p>
                    }
                    <ul className={BurgerConstructorStyle.order__list}>
                        {currentIngredients.map((item, itemIndex) =>
                        (item.type !== 'bun'
                            && <CurrentIngredient
                                key={item.pseudoUuid}
                                index={itemIndex}
                                item={item}
                                id={`${item._id}${itemIndex}`}
                                shiftElement={shiftElement}
                            />))}
                    </ul>
                    {
                        currentIngredients.length > 0 && <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bunHighlighter(currentIngredients, '(низ)', 'Переместите сюда', 'name')}
                            price={bunHighlighter(currentIngredients, '', '0', 'price')}
                            thumbnail={bunHighlighter(currentIngredients, '', '', 'image')}
                        />
                    }
                </div>
                <SummaryConstructor />
            </section >
        </DndProvider>
    );
};

BurgerConstructor.propTypes = {
    onDropHandler: PropTypes.func.isRequired,
};

export default BurgerConstructor