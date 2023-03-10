export interface ITakeCoordinates {
    top: number,
}

export interface ICheckCoordinates {
    name: string,
    value: number,
}

export interface IIngredient {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    pseudoUuid: number,
};

export type TIngredientTypes = Pick<IIngredient, 'type'>;

export interface IBurgerConstructorProps {
    onDropHandler: (elementId: IIngredient) => void,
};

export interface ICurrentIngredientProps {
    item: IIngredient,
    id: string,
    index: number,
    shiftElement: (dragIndex: number, hoverIndex: number) => void,
}

export interface IIngredientProps {
    _id: IIngredient['_id'],
    name: IIngredient['name'],
    price: IIngredient['price'],
    image: IIngredient['image'],
}

export interface IIngredientDetailsProps {
    heading?: string,
}