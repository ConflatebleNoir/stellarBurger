import { testBunSelector } from "../../utils";

describe('modal open', () => {
    before(() => {
        cy.visit('');
    });

    it('have to open burger constructor page by default', () => {
        cy.contains('Соберите бургер');
    });

    it('have to open and close modal by click', () => {
        cy.visit('');
        cy.wait(1000);
        cy.get('li').contains(testBunSelector).click();
        cy.contains('Детали ингредиента');
        cy.get('header').find('button').click();
        cy.wait(500);
    });
});