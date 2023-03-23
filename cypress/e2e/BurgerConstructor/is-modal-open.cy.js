describe('modal open', () => {
    before(() => {
        cy.visit('http://localhost:3000');
    });

    it('have to open burger constructor page by default', () => {
        cy.contains('Соберите бургер');
    });

    it('have to open and close modal by click', () => {
        cy.visit('http://localhost:3000');
        cy.wait(1000);
        cy.get('li').contains('Флюоресцентная булка R2-D3').click();
        cy.contains('Детали ингредиента');
        cy.get('header').find('button').click();
        cy.wait(500);
    });
});