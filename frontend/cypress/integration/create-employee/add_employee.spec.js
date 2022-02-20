// TODO refactor, separate to multiple tests, add invalid form submission

const form = () => cy.get('[data-testid=employee-form]');
const table = () => cy.get('[data-testid=employee-table]');
const tableRows = () => table().find('.ant-table-body').find('tr');

describe('employee creating process', () => {
    beforeEach(() => {
        cy.visit('/employee-list');
        cy.waitUntil(() => tableRows().should('have.length', 16), { timeout: 8000 });
        cy.get('[data-testid=create-employee-button]').click();
    });

    it('Matches the image snapshot', () => {
        /** Take page snapshot image and compare it to the previous one, to find any potencial styling changes **/
        form().toMatchImageSnapshot();
    });

    /** Currently there is unfortunately no support for PDF files in Cypress **/

    // it('checks attachment upload via drag & drop', () => {
    //     cy.get('[data-testid="attachments-dropzone"]').selectFile(cy.fixture('/cypress/fixtures/pdf-test.pdf'), {
    //         action: 'drag-drop',
    //     });
    //     cy.get('.ant-upload-list ').find('.ant-upload-list-item').find('a').should('contain.text', 'test');
    // });
    //
    // it('checks attachment upload via clicking on input', () => {
    //     cy.get('[data-testid="attachments-dropzone"]').selectFile(cy.fixture('/cypress/fixtures/pdf-test.pdf'));
    //     cy.get('.ant-upload-list ').find('.ant-upload-list-item').find('a').should('contain.text', 'test');
    // });

    /////*/*/*/*/*/*/*/*/

    it('checks profile picture upload', () => {
        cy.get('[data-testid="profile-picture-input"]').attachFile('test-image.png', {});
        cy.waitUntil(() => cy.get('[data-testid="profile-picture"] img').should('be.visible'));
        cy.waitUntil(() => cy.get('[data-testid="profile-picture"] img').toMatchImageSnapshot());
    });

    it('checks profile picture change', () => {
        cy.get('[data-testid="drawer-close-button"]').click();
        cy.waitUntil(() => cy.get('[data-testid="employee-2-edit-button"]').click());
        cy.waitUntil(() => cy.get('[data-testid="profile-picture"]').should('be.visible'));

        cy.get('[data-testid="profile-picture"] img')
            .invoke('attr', 'src')
            .then((firstSrc) => {
                const src1 = firstSrc;

                cy.get('[data-testid="profile-picture-input"]').attachFile('test-image2.png', {});

                /* FIXME waitUntil */

                cy.wait(1000);

                cy.get('[data-testid="profile-picture"] img')
                    .invoke('attr', 'src')
                    .then((nextSrc) => {
                        expect(nextSrc).to.not.equal(src1);
                    });
            });
    });

    /**  **/

    it('Fill the form correctly', () => {
        cy.get('[data-testid="profile-picture-input"]').attachFile('test-image.png', {});

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
        cy.get('[data-testid=phone-number-input-field]')
            .should('have.value', '1')
            .type('{backspace}')
            .type('42075800245')
            .blur();
        cy.contains('Číslo musí mít přesně 12 číslic');
        cy.get('[data-testid=phone-number-input-field]').focus().type('8');
        cy.get('[data-testid=phone-number-input-error').should('not.exist');

        /** **/

        /** TODO TEST DATES AND CATEGORY? **/

        /** Test selecting category **/

        cy.get('[data-testid=category-select-input]').click();
        cy.get('.ant-select-dropdown')
            .children()
            .should('contain', 'A')
            .and('contain', 'B')
            .and('contain', 'C')
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

        /** FILES - Currently there is unfortunately no support for PDF files in Cypress **/

        // cy.get('[data-testid="attachments-dropzone-input"]').attachFile({
        //     filePath: `pdf-test.pdf`,
        //     // encoding: 'base64',
        //     encoding: 'utf-8',
        // });

        // cy.get('[data-testid="attachments-dropzone-input"]').selectFile(cy.fixture('/cypress/fixtures/pdf-test.pdf'), {
        //     action: 'drag-drop',
        // });

        // const fileName = 'pdf-test.pdf';
        //
        // cy.fixture(fileName).then((fileContent) => {
        //     cy.get('[data-testid="attachments-dropzone-input"]').attachFile(
        //         { fileContent, fileName, mimeType: 'application/pdf' },
        //         { subjectType: 'input' },
        //     );
        // });

        cy.get('[data-testid=submit-button]').click();

        /** Test if page was redirected, message was shown and menu tab was colored properly **/

        // cy.location('pathname').should('include', 'employee-list');

        cy.get('[data-testid=menu-employee-list-item]')
            .should('have.attr', 'class')
            .and('match', /selected/);

        cy.waitUntil(() => form().should('not.be.visible'));

        cy.get('.ant-pagination-next').click();

        table()
            .contains('td', 'something') // gives you the cell
            .siblings() // gives you all the other cells in the row
            .get('[data-testid=employee-58-edit-button]') // finds the delete button
            .click();

        cy.waitUntil(() => cy.get('.ant-drawer-body').scrollTo('top'));
        cy.waitUntil(() => cy.get('[data-testid="profile-picture"] img').should('be.visible'));

        cy.waitUntil(() => cy.get('[data-testid="profile-picture"]').find('img').toMatchImageSnapshot());

        /** **/

        /** TODO Test invalid form submission, while raising error message and not letting it contact API and continue further **/
    });
});
