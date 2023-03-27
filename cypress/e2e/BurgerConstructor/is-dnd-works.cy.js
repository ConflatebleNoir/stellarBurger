describe('dnd test', () => {
    before(() => {
        cy.visit('');
    });

    it('have to drag element to drop container', () => {
        cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
            fixture: "ingredients",
        });
        cy.contains('Соберите бургер');
        cy.get('li').contains('Флюоресцентная булка R2-D3').trigger('dragstart');
        cy.get('div').contains('Переместите сюда').trigger('drop');
        cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart');
        cy.get('div').contains('верх').trigger('drop');
        cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart');
        cy.get('div').contains('верх').trigger('drop');
        cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart');
        cy.get('div').contains('верх').trigger('drop');
        cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart');
        cy.get('div').contains('верх').trigger('drop');
    });
});