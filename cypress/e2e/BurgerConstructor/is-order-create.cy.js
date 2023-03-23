describe('create order', () => {
    before(() => {
        cy.visit('http://localhost:3000');
    });

    it('have to open burger constructor page by default', () => {
        cy.contains('Соберите бургер');
    });

    it('have to make an order, trigger a login route, pass through auth and get an order ID', () => {
        cy.visit('http://localhost:3000');
        cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
            fixture: "ingredients",
        });
        cy.get('li').contains('Флюоресцентная булка R2-D3').rightclick();
        cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').rightclick();
        cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').rightclick();
        cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').rightclick();
        cy.get('button').contains('Оформить заказ').click();
        cy.contains('Вход');
        cy.get('form').within(() => {
            cy.get('input:first').should('have.attr', 'name', 'e-mail').type('fightfully162636@gmail.com');
            cy.get('input:last').should('have.attr', 'name', 'password').type('162636');
        });
        cy.get('button').contains('Войти').click();
        cy.get('button').contains('Оформить заказ').click();
        cy.wait(15000);
        cy.contains('идентификатор заказа');
        cy.get('header').find('button').click();
    });
});