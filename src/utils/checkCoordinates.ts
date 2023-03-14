import { ITakeCoordinates, ICheckCoordinates } from "../services/types/types";

const takeCoordinates = (element: HTMLElement | null) => {
    const container = element?.getBoundingClientRect();

    if (container) {
        return {
            top: Math.round(container.top + window.scrollY),
            left: Math.round(container.left + window.scrollX)
        };
    }
};

export const checkCoordinates = (className: string) => {
    const bunTitleCoordinates = (takeCoordinates(document.getElementById('bun')) as ITakeCoordinates).top;
    const mainTitleCoordinates = (takeCoordinates(document.getElementById('main')) as ITakeCoordinates).top;
    const sauceTitleCoordinates = (takeCoordinates(document.getElementById('sauce')) as ITakeCoordinates).top;
    const containerCoordinates = (takeCoordinates(document.querySelector(`.${className}`)) as ITakeCoordinates).top;

    const absoluteValueCoordinates = [
        {
            name: 'bun',
            value: Math.abs(containerCoordinates - bunTitleCoordinates),
        },
        {
            name: 'main',
            value: Math.abs(containerCoordinates - mainTitleCoordinates),
        },
        {
            name: 'sauce',
            value: Math.abs(containerCoordinates - sauceTitleCoordinates),
        },
    ];

    const coordinatesArray = absoluteValueCoordinates.map(coordinate => coordinate.value);
    const lowerValue = Math.min(...coordinatesArray);
    const targetName = (absoluteValueCoordinates.find(coordinate => coordinate.value === lowerValue) as ICheckCoordinates).name;

    return targetName;
}