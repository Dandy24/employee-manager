describe('proccess of finding company through search box', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    /** Rewrite using variables and aliases: https://docs.cypress.io/guides/core-concepts/variables-and-aliases **/

    it('Matches the image snapshot', () => {
        /** Take page snapshot image and compare it to the previous one, to find any potencial styling changes **/
        cy.document().toMatchImageSnapshot();
    });

    it('opens search box, type concrete record and select', () => {
        cy.get('[data-testid=company-table]').find('tr').should('have.length', 5);

        cy.get('[data-testid=search-bar]').click(); //type('Dan');
        cy.get('[data-testid=search-item-0]').should('not.be.empty');

        /** Check lenght of search options list **/
        cy.get('.rc-virtual-list-holder-inner').find('[data-testid^=search-item-]').should('have.length', 4);

        /** Check correct value in input after selecting record **/
        cy.get('.rc-virtual-list-holder-inner').contains('Dan').click();
        cy.get('[data-testid=search-bar]')
            .find('input')
            .should('have.value', 'Dan zxczxc | 123 | 17. listopadu 639/24');

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

    it('check if lowercase/uppercase filter works', function () {
        cy.get('[data-testid=search-bar]').type('dan'); //type('Dan');
        //
        /** Check lenght of search options list **/
        cy.get('.rc-virtual-list-holder-inner').find('[data-testid^=search-item-]').should('have.length', 1);

        /** ?????????????????????????????????? **/
        cy.get('[data-testid=search-item-1] > h5').should('contain.text', 'Dan zxczxc 123 17. listopadu 639/24');
    });

    it('check autocomplete multiple record with similair keywords', function () {
        cy.get('[data-testid=search-bar]').type('17. listopadu'); //type('Dan');
        //
        /** Check lenght of search options list **/
        cy.get('.rc-virtual-list-holder-inner').find('[data-testid^=search-item-]').should('have.length', 3);

        /** Check lenght of search options list **/
        cy.get('.rc-virtual-list-holder-inner')
            .find('[data-testid^=search-item-] > h5')
            .should('include.text', '17. listopadu');
    });

    it('check filtering multiple records using Enter button', () => {
        cy.get('[data-testid=search-bar]').type('17. listopadu').type('{enter}'); //type('Dan');

        /** check table filtered rows **/
        cy.get('[data-testid=company-table]')
            .find('tr')
            .should('have.length', 4)
            .and('contain.text', 'Dan')
            .and('contain.text', '89')
            .and('contain.text', '+420123456789');
    });

    it('check filtering multiple records and clicking Search button', () => {
        cy.get('[data-testid=search-bar]').type('17. listopadu'); //type('Dan');
        cy.get('[data-testid=search-bar]').find('.ant-input-search-button').click();

        /** check table filtered rows **/
        cy.get('[data-testid=company-table]')
            .find('tr')
            .should('have.length', 4)
            .and('contain.text', 'Dan')
            .and('contain.text', '89')
            .and('contain.text', '+420123456789');
    });

    it('check clearing searchbar and resseting filtered table', () => {
        cy.get('[data-testid=search-bar]').type('17. listopadu').type('{enter}'); //type('Dan');

        cy.get('[data-testid=search-bar]').find('.ant-select-clear').click();

        cy.get('[data-testid=search-button]').should('be.empty');

        /** check table filtered rows **/
        cy.get('[data-testid=company-table]').find('tr').should('have.length', 5);
    });

    // it('check autocomplete reccommendations', () => {
    //     cy.get('[data-testid=search-bar]').click(); //type('Dan');
    //
    //     /** Check lenght of search options list **/
    //     cy.get('.rc-virtual-list-holder-inner').find('[data-testid^=search-item-]').should('have.length', 4);
    //
    //     /** Check if option will disappear if it doesn't met filter **/
    //     cy.get('[data-testid=search-bar]').type('a');
    //
    //     cy.get('.rc-virtual-list-holder-inner').find('[data-testid^=search-item-]').should('have.length', 2);
    //
    //     cy.get('[data-testid=search-bar]').type('g');
    //     cy.get('.rc-virtual-list-holder-inner').should('contain.text', 'Swagger');
    //
    //     cy.get('[data-testid=search-bar]').type('{backspace}');
    //     cy.get('.rc-virtual-list-holder-inner').find('[data-testid^=search-item-]').should('have.length', 2);
    //
    //     cy.get('.rc-virtual-list-holder-inner').should('contain.text', 'Swagger').and('contain.text', 'Dan');
    // });

    // it('check showing no results', () => {
    //     //     //cy.find('[data-testid=search-item-0]');
    //     //
    //     //     //cy.get('#rc_select_0_list').should('contain.text', 'Firma nebyla nalezena');
    //     //     //cy.get('#rc_select_0_list > [data-testid=empty-autocomplete-list]').should('contain.html', 'img');
    // });
});
