import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { EmployeeForm } from '../EmployeeForm';
import { WorkingCategoryEnum } from '../../../models/enums/working-category-enum';
import { RootStore } from '../../../stores/root-store';
import { RootStoreProvider } from '../../../stores/root-store-provider';
import { BrowserRouter } from 'react-router-dom';
import { EmployeeDto } from '../../../models/dtos/employee-dto';
import userEvent from '@testing-library/user-event';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');

    const Select = (props) => {
        const multiple = ['tags', 'multiple'].includes(props.mode);

        return (
            <select
                value={props.value}
                defaultValue={props.defaultValue}
                multiple={multiple}
                disabled={props.disabled}
                data-testid={props['data-testid']}
                className={props.className}
                onChange={(e) =>
                    props.onChange(
                        multiple ? Array.from(e.target.selectedOptions).map((option) => option.value) : e.target.value,
                    )
                }
            >
                {props.children}
            </select>
        );
    };

    Select.Option = ({ children, ...otherProps }) => <option {...otherProps}>{children}</option>;
    Select.OptGroup = ({ children, ...otherProps }) => <optgroup {...otherProps}>{children}</optgroup>;

    return { ...antd, Select };
});

export const initialEmployee = {
    id: 123,
    first_name: 'Test',
    last_name: 'Employee',
    email: 'test@email.com',
    phone: 420123456789,
    active: true,
    med_exam_date: '2022-02-01',
    job_assign_date: '2022-02-12',
    working_category: WorkingCategoryEnum.C,
    health_limitations: '',
    company: null,
};

// Defining missing window.matchMedia() property from JSDOM, to prevent Jest from crashing
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

test('Form renders correctly with proper initial values', async () => {
    const handleSubmit = jest.fn();

    const { asFragment } = render(<EmployeeForm initialValues={new EmployeeDto()} onSubmit={handleSubmit} />);

    const form = await screen.findByTestId('employee-form-form');

    expect(form).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
});

test('Form display correct initial values', async () => {
    const handleSubmit = jest.fn();

    const { getAllByRole } = render(
        <RootStoreProvider rootStore={new RootStore()}>
            <BrowserRouter>
                <EmployeeForm initialValues={initialEmployee} onSubmit={handleSubmit} />
            </BrowserRouter>
        </RootStoreProvider>,
    );

    const form = await screen.findByTestId('employee-form-form');

    const firstNameInput = await screen.findByLabelText('Jméno');
    const activeCheckbox = await screen.findByRole('switch');
    const medExamInput = await screen.findByLabelText('Datum vstupní prohlídky');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const workCategoryInput = getAllByRole('combobox')[0];

    expect(firstNameInput).not.toBeNull();
    expect(firstNameInput).toHaveValue('Test');

    expect(workCategoryInput).not.toBeNull();
    expect(workCategoryInput).toHaveTextContent('B');

    expect(activeCheckbox).toBeChecked();

    expect(medExamInput).not.toBeNull();
    expect(medExamInput).toHaveValue('2022-02-01');
});

test('Form submits profile picture correctly', async () => {
    const handleSubmit = jest.fn();

    const fakeFile = [new File(['fake image data'], 'hello.png', { type: 'image/png' })];
    const fakeDoc = [new File(['fake PDF document'], 'document.pdf', { type: 'application/pdf' })];

    render(
        <RootStoreProvider rootStore={new RootStore()}>
            <BrowserRouter>
                <EmployeeForm initialValues={initialEmployee} onSubmit={handleSubmit} />
            </BrowserRouter>
        </RootStoreProvider>,
    );

    const profilePictureInput = await screen.findByTestId('profile_picture-input');
    // userEvent.upload(profilePictureInput, [fakeFile], {}, { applyAccept: true });

    fireEvent.drop(profilePictureInput, {
        dataTransfer: {
            files: fakeFile,
        },
    });

    const attachmentInput = await screen.findByTestId('attachment-dropzone-input');

    fireEvent.drop(attachmentInput, {
        dataTransfer: {
            files: fakeDoc,
        },
    });

    userEvent.click(await screen.findByText('Uložit'));

    /** TODO Submit was called successfully with image and attachment **/

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalled();
        // expect(handleSubmit).toHaveBeenCalledWith({
        //     id: 123,
        //     first_name: 'Test',
        //     last_name: 'Employee',
        //     email: 'test@email.com',
        //     phone: 420123456789,
        //     active: true,
        //     med_exam_date: '2022-02-01',
        //     job_assign_date: '2022-02-12',
        //     working_category: WorkingCategoryEnum.C,
        //     health_limitations: '',
        //     company: null,
        //     attachment: fakeDoc[0],
        //     profile_picture: fakeFile[0],
        // });
    });
});

test('Form method isnt called and errors are shown when inputting wrong values', async () => {
    const handleSubmit = jest.fn();

    render(<EmployeeForm initialValues={new EmployeeDto()} onSubmit={handleSubmit} />);

    const firstNameInput = await screen.findByLabelText('Jméno');
    const phoneInput = await screen.findByLabelText('Telefon');
    const emailInput = await screen.findByLabelText('Email');
    const workCategoryInput = await screen.findByRole('combobox');

    const submitButton = await screen.findByTestId('submit-button');

    userEvent.type(firstNameInput, 'Da'); /** Use too short name **/
    /** Forget last name **/
    userEvent.type(phoneInput, '12346578');
    /** Miss few numbers **/
    userEvent.type(emailInput, 'alfred.dlouhygmail.com'); /** Forget at-sign **/
    /** Forget to select category **/

    await waitFor(async () => {
        expect(firstNameInput).not.toBeNull();
        expect(firstNameInput).toHaveValue('Da');
        expect(await screen.findByTestId('text-input-error')).toBeInTheDocument();
        expect(await screen.findByText('Jméno je příliš krátké')).toBeInTheDocument();

        expect(phoneInput).not.toBeNull();
        expect(phoneInput).toHaveValue('12346578');
        expect(await screen.findByTestId('phone-number-input-error')).toBeInTheDocument();
        expect(await screen.findByText('Číslo musí mít přesně 12 číslic')).toBeInTheDocument();
    });

    // userEvent.click(await screen.findByTestId('category-select-input'));
    // /** https://github.com/testing-library/user-event/issues/189 **/
    // // userEvent.click(document.body);
    // fireEvent.blur(await screen.findByTestId('category-select-input'));

    userEvent.click(submitButton);

    expect(await screen.findByTestId('category-input-error')).toBeInTheDocument();
    expect(await screen.findByText('Kategorie musí být vyplněna')).toBeInTheDocument();

    await waitFor(async () => {
        expect(handleSubmit).not.toHaveBeenCalled();
        expect(await screen.findByTestId('invalid-form-error')).toBeInTheDocument();
        expect(
            await screen.findByText('Ve formuláři jsou chyby. Opravte je a zkuste to prosím znovu.'),
        ).toBeInTheDocument();
    });
});

test('Form submit is called correctly with required inputs', async () => {
    const handleSubmit = jest.fn();

    render(<EmployeeForm initialValues={new EmployeeDto()} onSubmit={handleSubmit} />);

    const firstNameInput = await screen.findByLabelText('Jméno');
    const lastNameInput = await screen.findByLabelText('Příjmení');
    const phoneInput = await screen.findByLabelText('Telefon');
    const emailInput = await screen.findByLabelText('Email');
    const workCategoryInput = await screen.findByRole('combobox');

    const submitButton = await screen.findByTestId('submit-button');

    userEvent.type(firstNameInput, 'Alfred');
    userEvent.type(lastNameInput, 'Dlouhy');
    userEvent.type(phoneInput, '420735445210');
    userEvent.type(emailInput, 'alfred.dlouhy@gmail.com');
    userEvent.selectOptions(workCategoryInput, ['A']);

    expect(firstNameInput).not.toBeNull();
    expect(firstNameInput).toHaveValue('Alfred');

    expect(workCategoryInput).not.toBeNull();
    expect(workCategoryInput).toHaveValue('A');

    userEvent.click(submitButton);

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalled();
        expect(handleSubmit.mock.calls[0][0]).toEqual({
            first_name: 'Alfred',
            last_name: 'Dlouhy',
            phone: 420735445210,
            email: 'alfred.dlouhy@gmail.com',
            working_category: 'A',
            active: undefined,
            attachment: undefined,
            company: undefined,
            health_limitations: undefined,
            job_assign_date: undefined,
            med_exam_date: undefined,
            profile_picture: undefined,
        });
        /** Toto pri volani funkce vklada krome SPRAVNEHO objektu vypsaneho nize, taky seznam funkci Formiku,
         *  proto podminka dole neplati a je pouzito reseni vyse **/
        // expect(handleSubmit).toHaveBeenCalledWith({
        //     first_name: 'Alfred',
        //     last_name: 'Dlouhy',
        //     phone: 420735445210,
        //     email: 'alfred.dlouhy@gmail.com',
        //     working_category: 'A',
        //     active: undefined,
        //     attachment: undefined,
        //     company: undefined,
        //     health_limitations: undefined,
        //     job_assign_date: undefined,
        //     med_exam_date: undefined,
        //     profile_picture: undefined,
        // });
    });
});
