describe('proccess of finding company through search box', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    /** Rewrite using variables and aliases: https://docs.cypress.io/guides/core-concepts/variables-and-aliases **/

    it('Matches the image snapshot', () => {
        /** Take page snapshot image and compare it to the previous one, to find any potencial styling changes **/
        cy.document().toMatchImageSnapshot();
    });

    it('opens search box and select one record', () => {
        cy.get('[data-testid=company-table]').find('tr').should('have.length', 5);

        cy.get('[data-testid=search-bar]').click(); //type('Dan');
        cy.get('[data-testid=search-item-0]').should('not.be.empty');

        /** Check lenght of search options list **/
        cy.get('.rc-virtual-list-holder-inner').find('[data-testid^=search-item-]').should('have.length', 4);

        /** Check correct value in input after selecting record **/
        cy.get('.rc-virtual-list-holder-inner').contains('Dan').click();
        cy.get('[data-testid=search-bar]').find('input').should('have.value', 'Dan zxczxc');

        /** check table filtered rows **/
        cy.get('[data-testid=company-table]')
            .find('tr')
            .should('have.length', 2)
            .and('contain.text', '17. listopadu 639/24');
    });

    it('Zoom company avatar by clicking on it', () => {
        cy.get('[data-testid=search-bar]').click();
        cy.get('[data-testid=search-item-0]')
            .find('.ant-avatar')
            .trigger('mouseover')
            .should('include.text', 'Preview')
            .click();

        // TODO check showing image overview and hiding it
    });

    it('check autocomplete reccommendations', () => {
        cy.get('[data-testid=search-bar]').click(); //type('Dan');

        /** Check lenght of search options list **/
        cy.get('.rc-virtual-list-holder-inner').find('[data-testid^=search-item-]').should('have.length', 4);

        /** Check if option will disappear if it doesn't met filter **/
        cy.get('[data-testid=search-bar]').type('a');

        cy.get('.rc-virtual-list-holder-inner').find('[data-testid^=search-item-]').should('have.length', 2);

        cy.get('[data-testid=search-bar]').type('g');
        cy.get('.rc-virtual-list-holder-inner').should('contain.text', 'Swagger');

        cy.get('[data-testid=search-bar]').type('{backspace}');
        cy.get('.rc-virtual-list-holder-inner').find('[data-testid^=search-item-]').should('have.length', 2);

        cy.get('.rc-virtual-list-holder-inner').should('contain.text', 'Swagger').and('contain.text', 'Dan');
    });

    // it('check showing no results', () => {
    //     //     //cy.find('[data-testid=search-item-0]');
    //     //
    //     //     //cy.get('#rc_select_0_list').should('contain.text', 'Firma nebyla nalezena');
    //     //     //cy.get('#rc_select_0_list > [data-testid=empty-autocomplete-list]').should('contain.html', 'img');
    // });
});
