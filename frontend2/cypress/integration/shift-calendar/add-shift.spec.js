import moment from 'moment';
import { createShift, deleteAllShifts } from '../../../src/api/apiCalls';

describe('proccess of creating shift through company calendar', () => {
    beforeEach(() => {
        deleteAllShifts();
        createShift({ date: '2021-11-15', time: 'ranni', companyID: 59, employeeIDs: [37, 43] });
        createShift({ date: '2021-11-15', time: 'vecer', companyID: 59, employeeIDs: [46, 19] });
        cy.visit('http://localhost:3000');
        cy.get('[data-testid=company-calendar-button-59]').click();
    });

    /** FIXME shifts only load up after clicking on calendar **/
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

    it('redirects to creation of new shift', () => {
        cy.get('[title="2021-11-15"]').find('.ant-picker-calendar-date-content').dblclick();
        cy.get('[data-testid=shift-add-button]').click();

        cy.get('[data-testid=create-shift-list]').find('li').should('have.length', 3);

        cy.get('[data-testid=new-shift-Rano]').should('have.class', 'ant-typography ant-typography-disabled');
        cy.get('[data-testid=new-shift-Vecer]').should('have.class', 'ant-typography ant-typography-disabled');

        cy.get('[data-testid=new-shift-Odpoledne]').click(); //should('have', 3); //TODO BE LINK
    });

    it('checks if data in new shift are correct after redirect', () => {
        cy.get('[title="2021-11-15"]').find('.ant-picker-calendar-date-content').dblclick();
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('.ant-page-header').find('.ant-page-header-heading-left').should('contain.text', 'Example Company');
        cy.get('.ant-page-header').find('.ant-page-header-heading-left').should('contain.text', 'November 15th 2021');
        // cy.get('.ant-page-header')
        //     .find('.ant-page-header-heading')
        //     .find('ant-tag ant-tag-blue')
        //     .should('contain.text', 'odpoledne')
        //     .and('be.visible');

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);
    });

    /** TODO SAVE SHIFT WITH NO EMPLOYEES **/
    /** TODO SHOW SOME SUCCESS STATE AFTER SAVING SHIFT  maybe https://ant.design/components/result/ ? **/
});
