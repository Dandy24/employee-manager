// TODO refactor, separate to multiple tests, add invalid form submission

const form = () => cy.get('[data-testid=employee-form]');

describe('employee creating process', () => {
    beforeEach(() => {
        cy.visit('/employee-list');
        cy.get('[data-testid=create-employee-button]').click();
    });

    it('Matches the image snapshot', () => {
        /** Take page snapshot image and compare it to the previous one, to find any potencial styling changes **/
        form().toMatchImageSnapshot();
    });

    it('Fill the form correctly', () => {
        /** Test if correct menu tab is colored **/

        // cy.get('[data-testid=menu-new-employee-item]')
        //     .should('have.attr', 'class')
        //     .and('match', /selected/);

        /** **/

        /** Test validation and filling in information **/

        cy.get('[data-testid=first_name-text-input] > [data-testid=text-input-field]')
            .type('Dan')
            .should('have.value', 'Dan')
            .clear()
            .should('be.empty')
            .blur();
        cy.get('[data-testid=first_name-text-input] > [data-testid=text-input-error]').should('be.visible');
        cy.get('[data-testid=first_name-text-input] > [data-testid=text-input-field]').type('something');
        cy.get('[data-testid=first_name-text-input] > [data-testid=text-input-error]').should('not.exist');

        cy.get('[data-testid=last_name-text-input] > [data-testid=text-input-field]').type('else');

        cy.get('.ant-input-number-handler-up').should('have.value', '').click();
        cy.get('[data-testid=number-input-field]')
            .should('have.value', '1')
            .type('{backspace}')
            .type('42075800245')
            .blur();
        cy.contains('Číslo musí mít 12 číslic');
        cy.get('[data-testid=number-input-field]').focus().type('8');
        cy.get('[data-testid=number-input-error').should('not.exist');

        /** **/

        /** TODO TEST DATES AND CATEGORY? **/

        /** Test selecting category **/

        cy.get('[data-testid=category-select-input]').click();
        cy.get('#rc_select_0_list')
            .children()
            .should('contain', 'A')
            .and('contain', 'B')
            //.and('contain', 'C')
            .get('[data-testid=category-select-option-B]')
            .click();

        /** **/

        /** Test textarea **/

        cy.get('[data-testid=health_limitations-text-area] > [data-testid=text-area-input]').type(
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In laoreet, magna id viverra tincidunt, sen',
        );
        cy.get('[data-testid=health_limitations-text-area] > [data-testid=text-area-error]').should('be.visible');

        cy.get('[data-testid=health_limitations-text-area] > [data-testid=text-area-input]').type('{backspace}');

        cy.get('[data-testid=health_limitations-text-area] > [data-testid=text-area-error]').should('not.exist');

        /** **/

        cy.get('[data-testid=submit-button]').click();

        /** Test if page was redirected, message was shown and menu tab was colored properly **/

        cy.location('pathname').should('include', 'employee-list');

        cy.get('[data-testid=menu-employee-list-item]')
            .should('have.attr', 'class')
            .and('match', /selected/);

        /** **/

        /** TODO Test invalid form submission, while raising error message and not letting it contact API and continue further **/
    });
});
