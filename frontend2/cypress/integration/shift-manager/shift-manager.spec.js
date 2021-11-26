import { createShift, deleteAllShifts } from '../../../src/api/apiCalls';
import { ShiftTypeEnum } from '../../../src/models/enums/shift-type-enum';

describe('shift validation', () => {
    beforeEach(() => {
        deleteAllShifts();
        createShift({ date: '2021-11-15', time: ShiftTypeEnum.Rano, companyID: 59, employeeIDs: [43] });
        createShift({ date: '2021-11-15', time: ShiftTypeEnum.Vecer, companyID: 59, employeeIDs: [46, 19] });
        cy.visit('http://localhost:3000');
        cy.get('[data-testid=company-calendar-button-59]').click();
        cy.get('[title="2021-11-15"]').find('.ant-picker-calendar-date-content').dblclick();
    });

    /** FIXME ADD ERROR IGNORE support/index.js **/
    // it('saving empty shift', () => {
    //     cy.get('[data-testid=shift-add-button]').click();
    //     cy.get('[data-testid=new-shift-Odpoledne]').click();
    //     cy.get('[data-testid=submit-shift-button]').click();
    //
    //     cy.get('.ant-message-notice-content').should('contain.text', 'Smena nema zadne zamestnance');
    //     // cy.get('.ant-message-notice-content').find('span').should('have.class', '.anticon-close-circle"');
    //
    //     cy.get('[data-testid=shift-submit-result-title]')
    //         .should('be.visible')
    //         .and('have.text', 'Směnu se nepodařilo vytvořit.');
    //
    //     cy.get('[data-testid=back-to-calendar-button]').click();
    //
    //     cy.get('main > .ant-picker-calendar-full').should('exist').and('be.visible');
    //     cy.get('[data-testid=header-company-name]').should('have.text', 'Example Company');
    // });

    it('assigning employees to shift and succesfully saving', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.dragAndDrop('[data-testid=employee-table-row-4]', '[data-testid=shift-table-body]');
        // eslint-disable-next-line testing-library/await-async-utils,cypress/no-unnecessary-waiting
        cy.wait(500);

        cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 1);

        cy.get('[data-testid=submit-shift-button]').click();

        cy.get('.ant-result-success').should('be.visible');
        cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Směnu se podařilo úspěšně vytvořit.');
        cy.get('[data-testid=shift-submit-result-subtitle]').should(
            'have.text',
            'Směna je naplánována na 2021-11-15 odpoledne',
        );

        cy.get('[data-testid=submit-shift-button]').should('have.attr', 'disabled');

        cy.get('[data-testid=back-to-calendar-button]').click();

        cy.get('[title="2021-11-15"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content').should(
            'contain.text',
            'odpoledne',
        );
    });

    /** Employee wont be added to shift, error message is thrown and employee stays in original table **/
    it('check inactive employee assign', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);

        cy.dragAndDrop('[data-testid=employee-table-row-1]', '[data-testid=shift-table-body]');
        cy.get('.ant-message-notice-content').should('be.visible').and('have.text', 'Zamestnanec je neaktivni');

        cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 0);

        cy.get('[data-testid=employee-table-body]').find('tr').contains('37');
    });

    /** Employee wont be added to shift, error message is thrown and employee stays in original table **/
    it('check assigning employee already assigned elsewhere', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);

        cy.dragAndDrop('[data-testid=employee-table-row-3]', '[data-testid=shift-table-body]');
        cy.get('.ant-message-notice-content')
            .should('be.visible')
            .and('have.text', 'Zamestnanec se v tento den jiz nachazi na smene vecer');

        cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 0);

        cy.get('[data-testid=employee-table-body]').find('tr').contains('46');
    });

    /** Shift should not be saved and error result should be visible along with some error message **/
    it('check submitting invalid shift', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);

        cy.dragAndDrop('[data-testid=employee-table-row-2]', '[data-testid=shift-table-body]');
        cy.get('.ant-message-notice-content')
            .should('be.visible')
            .and('have.text', 'Zamestnanec se v tento den jiz nachazi na smene ranni');

        cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 0);

        cy.get('[data-testid=employee-table-body]').find('tr').contains('43');

        cy.get('[data-testid=submit-shift-button]').click();

        cy.get('.ant-result-error').should('be.visible');
        cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Směnu se nepodařilo vytvořit.');
        cy.get('[data-testid=shift-submit-result-subtitle]').should(
            'have.text',
            'Zkontrolujte prosím zda nebyly hlášeny chyby',
        );

        cy.get('[data-testid=back-to-calendar-button]').click();

        cy.get('[title="2021-11-15"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content').should(
            'not.contain.text',
            'odpoledne',
        );
    });

    /** FIXME PUT API call is currently broken **/
    /** Open existing shift, edit and save **/
    it('check submitting invalid shift', () => {
        cy.get('[data-testid=shift-ranni]').find('a').click();

        // cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);
        //
        // cy.dragAndDrop('[data-testid=employee-table-row-2]', '[data-testid=shift-table-body]');
        // cy.get('.ant-message-notice-content')
        //     .should('be.visible')
        //     .and('have.text', 'Zamestnanec se v tento den jiz nachazi na smene ranni');
        //
        // cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 0);
        //
        // cy.get('[data-testid=employee-table-body]').find('tr').contains('43');
        //
        cy.get('[data-testid=submit-shift-button]').click();
        //
        cy.get('.ant-result-success').should('be.visible');
        cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Směnu se podařilo úspěšně vytvořit.');
        cy.get('[data-testid=shift-submit-result-subtitle]').should(
            'have.text',
            'Směna je naplánována na 2021-11-15 ranni',
        );

        cy.get('[data-testid=back-to-calendar-button]').click();

        cy.get('[title="2021-11-15"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content').should(
            'contain.text',
            'ranni',
        );
    });
});
