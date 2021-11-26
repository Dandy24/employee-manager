import { createShift, deleteAllShifts } from '../../../src/api/apiCalls';
import { ShiftTypeEnum } from '../../../src/models/enums/shift-type-enum';

describe('shift validation', () => {
    beforeEach(() => {
        deleteAllShifts();
        createShift({ date: '2021-11-15', time: ShiftTypeEnum.Rano, companyID: 59, employeeIDs: [37, 43] });
        createShift({ date: '2021-11-15', time: ShiftTypeEnum.Vecer, companyID: 59, employeeIDs: [46, 19] });
        cy.visit('http://localhost:3000');
        cy.get('[data-testid=company-calendar-button-59]').click();
        cy.get('[title="2021-11-15"]').find('.ant-picker-calendar-date-content').dblclick();
    });

    // /** FIXME ADD ERROR IGNORE **/
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

        cy.dragAndDrop('[data-testid=employee-table-row-0]', '[data-testid=shift-table-body]');
    });
});
