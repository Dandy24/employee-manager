import moment from 'moment';

describe('proccess of creating shift through company calendar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('[data-testid=company-calendar-button-59]').click();
    });

    // it('Tests if the image snapshot of company calendar matches ', () => {
    //     /** Take page snapshot image and compare it to the previous one, to find any potencial styling changes **/
    //     cy.document().toMatchImageSnapshot();
    // });

    it('tests calender and header showing correctly', () => {
        cy.get('main > .ant-picker-calendar-full').should('exist').and('be.visible');
        cy.get('[data-testid=header-company-name]').should('have.text', 'Example Company');
    });

    it('tests calendar to have proper date set', () => {
        cy.get('main > .ant-picker-calendar-full')
            .find('.ant-picker-calendar-year-select')
            .should('exist')
            .and('be.visible')
            .and('have.text', moment().format('yyyy'));
        cy.get('main > .ant-picker-calendar-full')
            .find('.ant-picker-calendar-month-select')
            .should('exist')
            .and('be.visible')
            .and('have.text', moment().format('MMM'));
        cy.get('[data-testid=header-company-name]').should('have.text', 'Example Company');
    });

    /** FIXME shifts only load up after clicking on calendar **/
    it('tests shifts showing up correctly in calendar', () => {
        cy.get('[data-testid=shift-list-for-2021-11-15]').find('li').should('have.length', 2);

        cy.get('[title="2021-11-15"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content').should(
            'contain.text',
            'ranni',
        );

        cy.get('[title="2021-11-15"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content').should(
            'contain.text',
            'ranni',
        );

        cy.get('[title="2021-11-15"]').find('.ant-badge').should('exist');
    });

    it('deleting existing shift', () => {
        cy.get('[title="2021-11-15"]').find('.ant-picker-calendar-date-content').dblclick();

        cy.get('[data-testid=selected-day-modal]')
            .find('.ant-modal-body')
            .should('contain.text', 'ranni')
            .and('not.contain.text', 'odpoledne');

        cy.get('[data-testid=shift-list-for-2021-11-15]').find('li').should('have.length', 2);

        cy.get('[data-testid=shift-ranni]').find('button').click();

        cy.get('[role=document] > .ant-modal-content').should('be.visible');
        cy.get('.ant-modal-confirm-btns > .ant-btn-dangerous').click();

        cy.get('[data-testid=shift-list-for-2021-11-15]').find('li').should('have.length', 1);
        cy.get('[data-testid=selected-day-modal]').find('.ant-modal-body').should('not.contain.text', 'ranni');
    });

    it('creates new shift', () => {
        cy.get('[title="2021-11-15"]').find('.ant-picker-calendar-date-content').dblclick();
        cy.get('[data-testid=shift-add-button]').click();

        cy.get('[data-testid=create-shift-list]').find('li').should('have.length', 3);

        /** FIXME make whole row clickable, not just text **/

        cy.get('[data-testid=new-shift-Odpoledne]').click(); //should('have', 3); //TODO BE LINK

        /** TODO check successfull redirect and data **/

        // cy.get('[data-testid=shift-ranni]').find('button').click();
        //
        // cy.get('[role=document] > .ant-modal-content').should('be.visible');
        // cy.get('.ant-modal-confirm-btns > .ant-btn-dangerous').click();
        //
        // cy.get('[data-testid=shift-list-for-2021-11-15]').find('li').should('have.length', 1);
        // cy.get('[data-testid=selected-day-modal]').find('.ant-modal-body').should('not.contain.text', 'ranni');
    });

    /** TODO SAVE SHIFT WITH NO EMPLOYEES **/
    /** TODO SHOW SOME SUCCESS STATE AFTER SAVING SHIFT  maybe https://ant.design/components/result/ ? **/
});
