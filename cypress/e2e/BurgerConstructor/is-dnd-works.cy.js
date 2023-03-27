import { testBunSelector, testMainSelector } from "../../utils";
import { config } from '../../../src/utils/config'

describe('dnd test', () => {
    before(() => {
        cy.visit('');
    });

    it('have to drag element to drop container', () => {
        cy.intercept("GET", `${config.url}ingredients`, {
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