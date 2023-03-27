import { testBunSelector, testMainSelector } from "../../utils";

describe('dnd test', () => {
    before(() => {
        cy.visit('');
    });

    it('have to drag element to drop container', () => {
        cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
            fixture: "ingredients",
        });
        cy.contains('Соберите бургер');
        cy.get('li').contains(testBunSelector).trigger('dragstart');
        cy.get('div').contains('Переместите сюда').trigger('drop');
        cy.get('li').contains(testMainSelector).trigger('dragstart');
        cy.get('div').contains('верх').trigger('drop');
        cy.get('li').contains(testMainSelector).trigger('dragstart');
        cy.get('div').contains('верх').trigger('drop');
        cy.get('li').contains(testMainSelector).trigger('dragstart');
        cy.get('div').contains('верх').trigger('drop');
        cy.get('li').contains(testMainSelector).trigger('dragstart');
        cy.get('div').contains('верх').trigger('drop');
    });
});