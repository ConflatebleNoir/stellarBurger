const takeCoordinates = (element) => {
    const container = element.getBoundingClientRect();

    return {
        top: Math.round(container.top + window.scrollY),
    };
};

export const checkCoordinates = (className) => {
    const bunTitleCoordinates = takeCoordinates(document.getElementById('bun')).top;
    const mainTitleCoordinates = takeCoordinates(document.getElementById('main')).top;
    const sauceTitleCoordinates = takeCoordinates(document.getElementById('sauce')).top;
    const containerCoordinates = takeCoordinates(document.querySelector(`.${className}`)).top;

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
    const targetName = absoluteValueCoordinates.find(coordinate => coordinate.value === lowerValue).name;

    return targetName;
}