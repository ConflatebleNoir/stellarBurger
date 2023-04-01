describe('reach profile page', () => {
    before(() => {
        cy.visit('');
    });

    it('click profile link, reroute to login page', () => {
        cy.visit('');
        cy.contains('Соберите бургер');
        cy.get('li').contains('Личный кабинет').click();
        cy.contains('Вход');
        cy.get('form').within(() => {
            cy.get('input:first').should('have.attr', 'name', 'e-mail').type('fightfully162636@gmail.com');
            cy.get('input:last').should('have.attr', 'name', 'password').type('162636');
        });
        cy.get('button').contains('Войти').click();
        cy.get('p').contains('В этом разделе вы можете изменить свои персональные данные');
    });

    it('overview user orders', () => {
        cy.visit('');
        cy.contains('Соберите бургер');
        cy.get('li').contains('Личный кабинет').click();
        cy.contains('Вход');
        cy.get('form').within(() => {
            cy.get('input:first').should('have.attr', 'name', 'e-mail').type('fightfully162636@gmail.com');
            cy.get('input:last').should('have.attr', 'name', 'password').type('162636');
        });
        cy.get('button').contains('Войти').click();
        cy.get('p').contains('В этом разделе вы можете изменить свои персональные данные');
        cy.get('a').contains('История заказов').click();
        cy.wait(1000);
        cy.get('li').contains('#').click();
        cy.wait(500);
        cy.get('header').find('button').click();
    });
});