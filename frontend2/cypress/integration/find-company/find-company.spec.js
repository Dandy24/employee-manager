describe('proccess of finding company through search box', () => {
    const searchBar = () => cy.get('[data-testid=search-bar]');
    const searchList = () => cy.get('.rc-virtual-list-holder-inner');
    const companyTable = () => cy.get('[data-testid=company-table]');

    const checkFilteredRecords = () =>
        companyTable()
            .find('tr')
            .should('have.length', 4)
            .and('contain.text', 'ForExamplee Company')
            .and('contain.text', 'Realna adresa 48/2, Hnojnik, 739 53')
            .and('contain.text', 'Realna adresa 254/65, Ostrava, 780 01');

    const tableRows = () => companyTable().find('.ant-table-body').find('tr');

    beforeEach(() => {
        cy.visit('/company-list');
        cy.waitUntil(() => cy.waitUntil(() => tableRows().should('have.length', 16)));
    });

    it('Searchbar matches the image snapshot', () => {
        /** Take component image snapshot and compare it to the previous one, to find any potential styling changes **/
        searchBar().find('.ant-input-search').toMatchImageSnapshot();
    });

    it('Searchbar list matches the image snapshot', () => {
        /** Take component image snapshot and compare it to the previous one, to find any potential styling changes **/
        searchBar().click();
        cy.get('.ant-select-dropdown').toMatchImageSnapshot();
    });

    it('opens search box, type concrete record and select', () => {
        tableRows().should('have.length', 16);

        searchBar().click(); //type('Dan');
        cy.get('[data-testid=search-item-0]').should('not.be.empty');

        /** Check length of search options list **/
        searchList().find('[data-testid^=search-item-]').should('have.length', 8);

        /** Check correct value in input after selecting record **/
        searchList().contains('Test Company123').click();
        searchBar().find('input').should('have.value', 'Test Company123 | 420123456789 | 17. listopadu 639/244');

        /** check table filtered rows **/
        tableRows().should('have.length', 2).and('contain.text', '17. listopadu 639/244');
    });

    it('Zoom company avatar by clicking on it', () => {
        searchBar().click();
        cy.get('[data-testid=search-item-0]')
            .find('.ant-avatar')
            .trigger('mouseover')
            .should('include.text', 'Preview')
            .click();

        // TODO check showing image overview and hiding it
    });

    it('check if lowercase/uppercase filter works', () => {
        searchBar().type('eXamPle CoMp');
        //
        /** Check lenght of search options list **/
        searchList().find('[data-testid^=search-item-]').should('have.length', 1);

        cy.get('[data-testid=search-item-1] > h5').should(
            'contain.text',
            'Example Company  420456789123  Pracovni 123/45, Koprivnice, 735 05',
        );
    });

    it('check autocomplete multiple record with similair keywords', function () {
        searchBar().type('company');

        /** Check lenght of search options list **/
        searchList().find('[data-testid^=search-item-]').should('have.length', 8); //FIXME remove few companies in test-data and change amount?

        /** Check lenght of search options list **/
        searchList().find('[data-testid^=search-item-] > h5').should('include.text', 'Company');
    });

    it('check filtering multiple records using Enter button', () => {
        searchBar().type('realna adresa').type('{enter}');

        /** check table filtered rows **/
        checkFilteredRecords();
    });

    it('check filtering multiple records and clicking Search button', () => {
        searchBar().type('realna adresa'); //type('Dan');
        searchBar().find('.ant-input-search-button').click();

        /** check table filtered rows **/
        checkFilteredRecords();
    });

    it('check clearing searchbar and resseting filtered table', () => {
        searchBar().type('17. listopadu').type('{enter}'); //type('Dan');

        searchBar().find('.ant-select-clear').click();

        cy.get('[data-testid=search-button]').should('be.empty');

        /** check table filtered rows **/
        tableRows().should('have.length', 16);
    });

    // it('check showing no results', () => {
    //     searchBar().click().find('[data-testid=search-item-0]');
    //     cy.get('#rc_select_0_list').should('contain.text', 'Firma nebyla nalezena');
    //     cy.get('#rc_select_0_list > [data-testid=empty-autocomplete-list]').should('contain.html', 'img');
    // });
});
