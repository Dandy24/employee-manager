import moment from 'moment';
import { createShift, deleteAllShifts } from '../../../src/api/apiCalls';
import { ShiftTypeEnum } from '../../../src/models/enums/shift-type-enum';

const testDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

// TODO use image snapshot on concrete components, not just whole page

describe('proccess of creating shift through company calendar', () => {
    beforeEach(() => {
        cy.waitUntil(() => deleteAllShifts());
        cy.waitUntil(() =>
            createShift({ date: testDate, time: ShiftTypeEnum.Rano, companyID: 1, employeeIDs: [37, 43] }),
        );
        cy.waitUntil(() =>
            createShift({ date: testDate, time: ShiftTypeEnum.Vecer, companyID: 1, employeeIDs: [46, 19] }),
        );
        cy.visit('/company-list');
        cy.get('[data-testid=company-calendar-button-1]').click();
    });

    it('Tests if the image snapshot of company calendar matches ', () => {
        /** Take page snapshot image and compare it to the previous one, to find any potencial styling changes **/
        cy.document().toMatchImageSnapshot();
    });

    it('tests calender and header showing correctly', () => {
        cy.get('main > .ant-picker-calendar-full').should('exist').and('be.visible');
        cy.get('[data-testid=header-company-name]').should('have.text', 'Test Company123');
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
        cy.get('[data-testid=header-company-name]').should('have.text', 'Test Company123');
    });

    it('tests shifts showing up correctly in calendar', () => {
        cy.get(`[data-testid=shift-list-for-${testDate}]`).find('li').should('have.length', 2);

        cy.get(`[title="${testDate}"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content`).should(
            'contain.text',
            'ranni',
        );

        cy.get(`[title="${testDate}"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content`).should(
            'contain.text',
            'ranni',
        );

        cy.get(`[title="${testDate}"]`).find('.ant-badge').should('exist');
    });

    //FIXME wrap whole row in clickable link, fix getting button in [data-testid=shift-ranni], its currently only on text, not whole row including button
    it('deleting existing shift', () => {
        cy.get(`[title="${testDate}"]`).find('.ant-picker-calendar-date-content').dblclick();

        cy.get('[data-testid=selected-day-modal]')
            .find('.ant-modal-body')
            .should('contain.text', 'ranni')
            .and('not.contain.text', 'odpoledne');

        cy.get(`[data-testid=shift-list-for-${testDate}]`).find('li').should('have.length', 2);

        cy.get('[data-testid=shift-ranni]').find('button').click();

        cy.get('[role=document] > .ant-modal-content').should('be.visible');
        cy.get('.ant-modal-confirm-btns > .ant-btn-dangerous').click();

        cy.get(`[data-testid=shift-list-for-${testDate}]`).find('li').should('have.length', 1);
        cy.get('[data-testid=selected-day-modal]').find('.ant-modal-body').should('not.contain.text', 'ranni');
    });

    it('redirects to creation of new shift', () => {
        cy.get(`[title="${testDate}"]`).find('.ant-picker-calendar-date-content').dblclick();
        cy.get('[data-testid=shift-add-button]').click();

        cy.get('[data-testid=create-shift-list]').find('li').should('have.length', 3);

        cy.get('[data-testid=new-shift-Rano]').should('have.class', 'ant-typography ant-typography-disabled');
        cy.get('[data-testid=new-shift-Vecer]').should('have.class', 'ant-typography ant-typography-disabled');

        cy.get('[data-testid=new-shift-Odpoledne]').click(); //should('have', 3); //TODO BE LINK
    });

    //FIXME
    it('checks if data in new shift are correct after redirect', () => {
        cy.get(`[title="${testDate}"]`).find('.ant-picker-calendar-date-content').dblclick();
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('.ant-page-header').find('.ant-page-header-heading-left').should('contain.text', 'Test Company123');
        cy.get('.ant-page-header')
            .find('.ant-page-header-heading-left')
            .should('contain.text', moment().subtract(1, 'days').format('MMMM Do YYYY'));
        cy.get('.ant-page-header')
            .get('.ant-page-header-heading-tags > .ant-tag')
            .should('have.text', 'odpoledne')
            .and('be.visible');

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);
    });

    /** TODO SAVE SHIFT WITH NO EMPLOYEES ????????? **/
});
