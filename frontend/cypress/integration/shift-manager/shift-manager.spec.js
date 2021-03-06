import { createShift, deleteAllShifts } from '../../../src/api/apiCalls';
import { ShiftTypeEnum } from '../../../src/models/enums/shift-type-enum';
import moment from 'moment';

const testDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

const inactiveColor = 'rgba(245, 34, 45, 0.4)';

const isMoved = (table, length, text, inverse) => {
    cy.waitUntil(() =>
        cy
            .get(`[data-testid=${table}-table-body]`)
            .find('tr')
            .should('have.length', length)
            .and(`${inverse ? 'not.' : ''}contain.text`, text),
    );
};

const isRecordInTable = (table, length, text1, text2, inverse1, inverse2) => {
    cy.waitUntil(() =>
        cy
            .get(`[data-testid=${table}-table-body]`)
            .find('tr')
            .should('have.length', length)
            .and(`${inverse1 ? 'not.' : ''}contain.text`, text1)
            .and(`${inverse2 ? 'not.' : ''}contain.text`, text2),
    );
};

const isHTMLInTable = (table, htmlEl, text, inverse1, inverse2) => {
    cy.waitUntil(() =>
        cy
            .get(`[data-testid=${table}-table-body]`)
            .should(`${inverse1 ? 'not.' : ''}contain.html`, htmlEl)
            .and(`${inverse2 ? 'not.' : ''}contain.text`, text),
    );
};

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

    it('checkes visual regression of header', () => {
        cy.get('[data-testid=shift-ranni]').click();
        cy.get('.ant-page-header').toMatchImageSnapshot();
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
    //         .and('have.text', 'Sm??nu se nepoda??ilo vytvo??it.');
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
        cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Sm??nu se poda??ilo ??sp????n?? vytvo??it.');
        cy.get('[data-testid=shift-submit-result-subtitle]').should(
            'have.text',
            `Sm??na je napl??nov??na na ${testDate} odpoledne.`,
        );

        cy.get('[data-testid=submit-shift-button]').should('have.attr', 'disabled');

        cy.get('[data-testid=back-to-calendar-button]').click();

        cy.get(`[title="${testDate}"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content`).should(
            'contain.text',
            'odpoledne',
        );
    });

    /** Employee will have red color and show tooltip on hover **/
    it('check inactive employee', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);

        cy.get('[data-testid=employee-table-row-3]')
            .find('td') //TODO loop through all cells, not just one
            .eq(1)
            .should('have.css', 'background-color', inactiveColor);

        cy.get('[data-testid=employee-table-row-3]').trigger('mouseover');

        cy.waitUntil(() =>
            cy.get('#invalid-message-tooltip').should('be.visible').and('have.text', 'Zam??stnanec je neaktivn??'),
        );
    });

    it('check assigning employee already assigned elsewhere', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);

        cy.get('[data-testid=employee-table-row-1]')
            .find('td') //TODO loop through all cells, not just one
            .eq(1)
            .should('have.css', 'background-color', inactiveColor);

        cy.get('[data-testid=employee-table-row-1]').trigger('mouseover');

        cy.waitUntil(() =>
            cy
                .get('#invalid-message-tooltip')
                .should('be.visible')
                .and('have.text', 'Zam??stnanec se v tento den ji?? nach??z?? na sm??n?? vecer'),
        );
    });

    it('checks dragging invalid employee', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.waitUntil(() => cy.dragAndDrop('[data-testid=employee-table-row-1]', '[data-testid=shift-table-body]'));

        isHTMLInTable('shift', 'tr', 'MartinNovak', true, true);

        cy.waitUntil(() => cy.dragAndDrop('[data-testid=employee-table-row-3]', '[data-testid=shift-table-body]'));

        isHTMLInTable('shift', 'tr', 'AlfonzZelinka', true, true);
    });

    /** Shift should not be saved and error result should be visible along with some error message **/
    it('check submitting invalid shift (without any employees in shift list)', () => {
        cy.get('[data-testid=shift-add-button]').click();
        cy.get('[data-testid=new-shift-Odpoledne]').click();

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 5);

        cy.waitUntil(() => cy.dragAndDrop('[data-testid=employee-table-row-2]', '[data-testid=shift-table-body]'));

        cy.get('[data-testid=shift-table-body]').find('tr').should('have.length', 0);

        cy.get('[data-testid=employee-table-body]').find('tr').contains('43');

        cy.get('[data-testid=submit-shift-button]').should('be.disabled');
    });

    /** Open existing shift and save without changing anything **/
    it('check submitting existing shift without changing anything', () => {
        cy.waitUntil(() => cy.get('[data-testid=shift-ranni]').should('be.visible'));
        cy.get('[data-testid=shift-ranni]').click();

        cy.get('[data-testid=submit-shift-button]').click();

        cy.get('.ant-result-success').should('be.visible');
        cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Sm??nu se poda??ilo ??sp????n?? vytvo??it.');
        cy.get('[data-testid=shift-submit-result-subtitle]').should(
            'have.text',
            `Sm??na je napl??nov??na na ${testDate} ranni.`,
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

        isMoved('employee', 4, 'JanNovak');

        cy.dragAndDrop('[data-testid=employee-table-row-3]', '[data-testid=shift-table-body]');

        isMoved('shift', 2, 'JanNovak');

        cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 3);
    });

    /** Open existing shift and delete it **/
    it('checks delete existing shift from shift manager', () => {
        cy.waitUntil(() => cy.get('[data-testid=shift-ranni]').should('be.visible'));
        cy.get('[data-testid=shift-ranni]').click();

        cy.get('[data-testid=delete-shift-button]').click();

        cy.get('.ant-modal-body').should('be.visible');
        cy.get('.ant-modal-confirm-title').should('have.text', 'Opravdu chcete smazat tuto sm??nu?');

        cy.get('.ant-modal-confirm-btns > .ant-btn-dangerous').click();

        cy.get('main > .ant-picker-calendar-full').should('exist').and('be.visible');

        cy.get(`[title="${testDate}"] > .ant-picker-cell-inner > .ant-picker-calendar-date-content`).should(
            'not.contain.text',
            'ranni',
        );
    });

    /** Open existing shift, edit, save and reopen shift to check if shift data are correct **/
    it('Check opening existing shift, editing, saving and reopening shift to check if shift data are correct', () => {
        cy.waitUntil(() => cy.get('[data-testid=shift-vecer]').should('be.visible'));
        cy.get('[data-testid=shift-vecer]').click();

        isMoved('employee', 3, 19, true);
        isMoved('shift', 2, 19);

        cy.dragAndDrop('[data-testid=shift-table-row-1]', '[data-testid=employee-table-body]');
        cy.waitUntil(() =>
            cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 4).and('contain.text', 19),
        );

        cy.dragAndDrop('[data-testid=employee-table-row-2]', '[data-testid=shift-table-body]');
        isRecordInTable('shift', 2, 19, 'Marek', true);

        isRecordInTable('shift', 2, 19, 'Novak', true);

        cy.get('[data-testid=submit-shift-button]').click();

        cy.get('.ant-result-success').should('be.visible');
        cy.get('[data-testid=shift-submit-result-title]').should('have.text', 'Sm??nu se poda??ilo ??sp????n?? vytvo??it.');
        cy.get('[data-testid=shift-submit-result-subtitle]').should(
            'have.text',
            `Sm??na je napl??nov??na na ${testDate} vecer.`,
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
        isMoved('employee', 3, 19);

        isRecordInTable('shift', 2, 19, 'MarekHodny', true);
    });

    it('checks if shift data integrity remains after reloading the page', () => {
        const isCorrectAmountOfRows = () =>
            cy.get('[data-testid=employee-table-body]').find('tr').should('have.length', 3);

        cy.get('[data-testid=shift-vecer]').click();

        isCorrectAmountOfRows();
        isRecordInTable('shift', 2, 'MartinNovak', 'JanNovak');

        cy.get('[data-testid=employee-table-body]').find('tr').should('contain.text', 'MarekHodny');

        cy.reload();

        isCorrectAmountOfRows();
        isRecordInTable('shift', 2, 'MartinNovak', 'JanNovak');

        cy.get('[data-testid=employee-table-body]').find('tr').should('contain.text', 'MarekHodny');

        /** **/

        cy.get('[data-testid=shift-manager-header-breadcrumb]').contains('Kalend???? sm??n').click();
        cy.get('[data-testid=header-company-name]').should('have.text', 'Test Company123');
    });

    /** TODO test sorting and filtering - IMPLEMENT useSortBy & useGlobalFilter to react-table **/
});
