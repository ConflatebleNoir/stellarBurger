describe('scroll is available', () => {
    before(() => {
        cy.visit('');
    });

    it('have to scroll to position', () => {
        cy.get('li').contains('Сыр с астероидной плесенью').scrollIntoView({ duration: 500 });
    })
});