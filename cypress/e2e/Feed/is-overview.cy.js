describe('overview modal open', () => {
    before(() => {
        cy.visit('');
    });

    it('have to open feed page, get feed and open modal', () => {
        cy.contains('Соберите бургер');
        cy.get('li').contains('Лента заказов').click();
        cy.wait(500);
        cy.get('li').contains('#').click();
        cy.wait(500);
        cy.get('header').find('button').click();
    });
});