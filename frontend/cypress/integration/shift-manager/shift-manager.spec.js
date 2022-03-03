import { createShift, deleteAllShifts } from '../../../src/api/apiCalls';
import { ShiftTypeEnum } from '../../../src/models/enums/shift-type-enum';
import moment from 'moment';

const testDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

// TODO use image snapshot on concrete components, not just whole page

describe('shift validation', () => {
    beforeEach(() => {
        cy.waitUntil(() => deleteAllShifts());
        cy.waitUntil(() => createShift({ date: testDate, time: ShiftTypeEnum.Rano, companyID: 1, employeeIDs: [34] })); //43
        cy.waitUntil(
            () => createShift({ date: testDate, time: ShiftTypeEnum.Vecer, companyID: 1, employeeIDs: [2, 19] }), //46
        );

        cy.visit('/company-list');
        cy.get('[data-testid=company-calendar-button-1]').click();
        cy.waitUntil(() => cy.get(`[data-testid=shift-list-for-${testDate}]`));
        cy.get(`[title="${testDate}"]`).find('.ant-picker-calendar-date-content').dblclick();
    });

    it('checkes visual regression of shift manager', () => {
        cy.get('[data-testid=shift-ranni]').click();

        cy.waitUntil(() => cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 1));
        cy.waitUntil(() => cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 4));

        cy.get('[data-testid=shift-manager]').toMatchImageSnapshot();
    });

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

    it('creates new shift, assigns employees and successfully saves', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.dragAndDrop('[data-testid=employee-table-row-4]', '[data-testid=shift-table-body]');
        cy.waitUntil(() => cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 1));

        cy.waitUntil(() => cy.get('[data-testid=submit-shift-button]').click());

        cy.get('.ant-result-success').should('be.visible');
        cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Směnu se podařilo úspěšně vytvořit.');
        cy.get('[data-testid=shift-submit-result-subtitle]').should(
            'have.text',
            `Směna je naplánována na ${testDate} odpoledne.`,
        );

        cy.get('[data-testid=submit-shift-button]').should('have.attr', 'disabled');

        cy.get('[data-testid=back-to-calendar-button]').click();

        cy.get(`[title="${testDate}"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content`).should(
            'contain.text',
            'odpoledne',
        );
    });

    /** Employee wont be added to shift, error message is thrown and employee stays in original table **/
    it('check inactive employee assign', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);

        cy.dragAndDrop('[data-testid=employee-table-row-3]', '[data-testid=shift-table-body]');
        cy.get('.ant-message-notice-content').should('be.visible').and('have.text', 'Zaměstnanec je neaktivní');

        cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 0);

        cy.get('[data-testid=employee-table-body]').find('tr').contains('36');
    });

    /** Employee wont be added to shift, error message is thrown and employee stays in original table **/
    it('check assigning employee already assigned elsewhere', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);

        cy.dragAndDrop('[data-testid=employee-table-row-1]', '[data-testid=shift-table-body]');
        cy.get('.ant-message-notice-content')
            .should('be.visible')
            .and('have.text', 'Zaměstnanec se v tento den již nachází na směně vecer');

        cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 0);

        cy.get('[data-testid=employee-table-body]').find('tr').contains('19');
    });

    /** Shift should not be saved and error result should be visible along with some error message **/
    it('check submitting invalid shift', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);

        cy.waitUntil(() => cy.dragAndDrop('[data-testid=employee-table-row-2]', '[data-testid=shift-table-body]'));
        cy.waitUntil(() =>
            cy
                .get('.ant-message-notice-content')
                .should('be.visible')
                .and('have.text', 'Zaměstnanec se v tento den již nachází na směně ranni'),
        );

        cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 0);

        cy.get('[data-testid=employee-table-body]').find('tr').contains('43');

        cy.get('[data-testid=submit-shift-button]').should('be.disabled');
        // .click();

        /** WONT SHOW, BECAUSE SUBMIT BUTTON IS NOW DISABLED IF SHIFT IS INVALID **/

        // cy.get('.ant-result-error').should('be.visible');
        // cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Směnu se nepodařilo vytvořit.');
        // cy.get('[data-testid=shift-submit-result-subtitle]').should(
        //     'have.text',
        //     'Zkontrolujte prosím zda nebyly hlášeny chyby',
        // );

        // cy.get('[data-testid=back-to-calendar-button]').click();
        //
        // cy.get('[title="2021-12-15"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content').should(
        //     'not.contain.text',
        //     'odpoledne',
        // );
    });

    /** Open existing shift and save without changing anything **/
    it('check submitting existing shift without changing anything', () => {
        cy.waitUntil(() => cy.get('[data-testid=shift-ranni]').should('be.visible'));
        cy.get('[data-testid=shift-ranni]').click();

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
            `Směna je naplánována na ${testDate} ranni.`,
        );

        cy.get('[data-testid=back-to-calendar-button]').click();

        cy.get(`[title="${testDate}"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content`).should(
            'contain.text',
            'ranni',
        );
    });

    it('Check removing employee from shift, then returning him back', () => {
        cy.waitUntil(() => cy.get('[data-testid=shift-vecer]').should('be.visible'));
        cy.get('[data-testid=shift-vecer]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 3).and('not.contain.text', 19);
        cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 2).and('contain.text', 19);

        cy.dragAndDrop('[data-testid=shift-table-row-0]', '[data-testid=employee-table-body]');
        cy.waitUntil(() =>
            cy
                .get('[data-testid=employee-table-body]')
                .find('tr')
                .should('have.length', 4)
                .and('contain.text', 'JanNovak'),
        );

        cy.dragAndDrop('[data-testid=employee-table-row-3]', '[data-testid=shift-table-body]');
        cy.waitUntil(() =>
            cy
                .get('[data-testid=shift-table-body]')
                .find('tr')
                .should('have.length', 2)
                .and('contain.text', 'JanNovak'),
        );

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 3);

        // cy.get('[data-testid=submit-shift-button]').click();
        //
        // cy.get('.ant-result-success').should('be.visible');
        // cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Směnu se podařilo úspěšně vytvořit.');
        // cy.get('[data-testid=shift-submit-result-subtitle]').should(
        //     'have.text',
        //     `Směna je naplánována na ${testDate} vecer`,
        // );
    });

    /** Open existing shift, edit, save and reopen shift to check if shift data are correct **/
    it('Check opening existing shift, editing, saving and reopening shift to check if shift data are correct', () => {
        cy.waitUntil(() => cy.get('[data-testid=shift-vecer]').should('be.visible'));
        cy.get('[data-testid=shift-vecer]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 3).and('not.contain.text', 19);
        cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 2).and('contain.text', 19);

        cy.dragAndDrop('[data-testid=shift-table-row-1]', '[data-testid=employee-table-body]');
        cy.waitUntil(() =>
            cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 4).and('contain.text', 19),
        );

        cy.dragAndDrop('[data-testid=employee-table-row-2]', '[data-testid=shift-table-body]');
        cy.waitUntil(() =>
            cy
                .get('[data-testid=shift-table-body]')
                .find('tr')
                .should('have.length', 2)
                .and('not.contain.text', 19)
                .and('contain.text', 'Marek'),
        );

        cy.get('[data-testid=shift-table-body]')
            .find('tr')
            .should('have.length', 2)
            .and('not.contain.text', 19)
            .and('contain.text', 'Novak');

        cy.get('[data-testid=submit-shift-button]').click();

        cy.get('.ant-result-success').should('be.visible');
        cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Směnu se podařilo úspěšně vytvořit.');
        cy.get('[data-testid=shift-submit-result-subtitle]').should(
            'have.text',
            `Směna je naplánována na ${testDate} vecer.`,
        );

        cy.get('[data-testid=back-to-calendar-button]').click();

        cy.get(`[title="${testDate}"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content`).should(
            'contain.text',
            'vecer',
        );

        cy.get(`[title="${testDate}"]`).dblclick();
        cy.waitUntil(() => cy.get('[data-testid=shift-vecer]').should('be.visible'));
        cy.get('[data-testid=shift-vecer]').click();

        /** Verify that both tables are the same as before exiting the manager   **/
        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 3).and('contain.text', 19);
        cy.get('[data-testid=shift-table-body]')
            .find('tr')
            .should('have.length', 2)
            .and('not.contain.text', 19)
            .and('contain.text', 'MarekHodny');
    });

    /** TODO TEST PAGE RELOAD AND SHIFT REMAINS SAME AND CAN GO BACK TO CALENDAR AND COMPANY NAME IS CORRECT (try changing employees in shift) **/
    it('checks if shift data integrity remains after reloading the page', () => {
        cy.get('[data-testid=shift-vecer]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 3);

        cy.get('[data-testid=shift-table-body]')
            .find('tr')
            .should('have.length', 2)
            .and('contain.text', 'MartinNovak')
            .and('contain.text', 'JanNovak');

        cy.get('[data-testid=employee-table-body]').find('tr').should('contain.text', 'MarekHodny');

        cy.reload();

        /** TODO REFACTOR!!! dont copy **/

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 3);

        cy.get('[data-testid=shift-table-body]')
            .find('tr')
            .should('have.length', 2)
            .and('contain.text', 'MartinNovak')
            .and('contain.text', 'JanNovak');

        cy.get('[data-testid=employee-table-body]').find('tr').should('contain.text', 'MarekHodny');

        /** **/

        cy.get('[data-testid=shift-manager-header-breadcrumb]').contains('Kalendář směn').click();
        cy.get('[data-testid=header-company-name]').should('have.text', 'Test Company123'); //FIXME

        // cy.get('[data-testid=submit-shift-button]').click();

        /** TODO REFACTOR!!! move to separate fucntion with variable date and shift type **/

        // cy.get('.ant-result-success').should('be.visible');
        // cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Směnu se podařilo úspěšně vytvořit.');
        // cy.get('[data-testid=shift-submit-result-subtitle]').should(
        //     'have.text',
        //     `Směna je naplánována na ${testDate} vecer`,
        // );
        //
        // cy.get('[data-testid=back-to-calendar-button]').click();

        /** **/
    });

    /** Open existing shift and delete it **/
    it('checks delete existing shift from shift manager', () => {
        cy.waitUntil(() => cy.get('[data-testid=shift-ranni]').should('be.visible'));
        cy.get('[data-testid=shift-ranni]').click();

        cy.get('[data-testid=delete-shift-button]').click();

        cy.get('.ant-modal-body').should('be.visible');
        cy.get('.ant-modal-confirm-title').should('have.text', 'Opravdu chcete smazat tuto směnu?');

        cy.get('.ant-modal-confirm-btns > .ant-btn-dangerous').click();

        cy.get('main > .ant-picker-calendar-full').should('exist').and('be.visible');

        cy.get(`[title="${testDate}"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content`).should(
            'not.contain.text',
            'ranni',
        );
    });

    /** TODO test sorting and filtering - IMPLEMENT useSortBy & useGlobalFilter to react-table **/
});
