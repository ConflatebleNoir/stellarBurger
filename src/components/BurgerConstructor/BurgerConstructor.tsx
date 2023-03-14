import { useCallback, FC } from 'react'
import update from 'immutability-helper';
import BurgerConstructorStyle from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import { sortIngredients } from '../../services/actions/ingredients'
import CurrentIngredient from '../CurrentIngredient/CurrentIngredient'
import SummaryConstructor from '../SummaryConstructor/SummaryConstructor'
import { IBurgerConstructorProps, IIngredient, TIngredientTypes } from '../../services/types/types';

const BurgerConstructor: FC<IBurgerConstructorProps> = ({ onDropHandler }) => {
    const dispatch = useDispatch();
    const currentIngredients = useSelector((state: Array<object> | any) => state.ingredientsData.currentIngredients);
    const bunHighlighter = (
        currentIngredients: IIngredient[],
        boolValueTrue: string,
        boolValueFalse: string,
        prop: string,
    ) => currentIngredients.find((item: IIngredient) => item.type === 'bun')
            // @ts-ignore
            ? `${(currentIngredients.find((item: IIngredient) => item.type === 'bun'))[prop]} ${boolValueTrue}`
            : boolValueFalse;

    const [{ isHover }, ingredientsContainer] = useDrop({
        accept: 'ingredient',
        drop(elementId: IIngredient) {
            onDropHandler(elementId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const shiftElement = useCallback((dragIndex: number, hoverIndex: number) => {
        const elementTypeBun = currentIngredients.filter(({ type }: TIngredientTypes) => type === 'bun');
        const elementNonBun = currentIngredients.filter(({ type }: TIngredientTypes) => type !== 'bun');
        const sortedBase = update(elementNonBun, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, elementNonBun[dragIndex]],
            ],
        },

        );
        const sortedElementsBun = [...elementTypeBun, ...sortedBase];
        dispatch(sortIngredients([...sortedElementsBun]));
    }, [currentIngredients, dispatch]);

    const containerBorder = isHover ? '#801ab3' : 'transparent';

    return (
        <section className={BurgerConstructorStyle.container + ' ' + 'pt-25'}>
            <div className={BurgerConstructorStyle.container__entrails} ref={ingredientsContainer} style={{ borderColor: containerBorder }}>
                {
                    currentIngredients.length > 0
                        ? <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bunHighlighter(currentIngredients, '(верх)', 'Переместите сюда', 'name')}
                            price={+bunHighlighter(currentIngredients, '', '0', 'price')}
                            thumbnail={bunHighlighter(currentIngredients, '', '', 'image')}
                        />
                        : <p>Переместите сюда</p>
                }
                <ul className={BurgerConstructorStyle.order__list}>
                    {currentIngredients.map((item: IIngredient, itemIndex: number) =>
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
                        price={+bunHighlighter(currentIngredients, '', '0', 'price')}
                        thumbnail={bunHighlighter(currentIngredients, '', '', 'image')}
                    />
                }
            </div>
            <SummaryConstructor />
        </section >
    );
};

export default BurgerConstructor