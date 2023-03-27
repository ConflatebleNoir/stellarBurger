describe('feed is available', () => {
    it('have to be available on localhost:3000/feed', () => {
        cy.visit('feed');
    });
});