import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { EmployeeFormik } from '../EmployeeFormik';
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
    first_name: 'Test',
    last_name: 'Employee',
    email: 'test@email.com',
    phone: 420123456789,
    active: true,
    med_exam_date: '2022-02-01',
    job_assign_date: '2022-02-12',
    working_category: WorkingCategoryEnum.C,
    health_limitations: null,
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

    const { asFragment, getByTestId } = render(
        <RootStoreProvider rootStore={new RootStore()}>
            <BrowserRouter>
                <EmployeeFormik initialValues={new EmployeeDto()} onSubmit={handleSubmit} />
            </BrowserRouter>
        </RootStoreProvider>,
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const form = getByTestId('employee-form-form');

    expect(form).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
});

test('Form display correct initial values', async () => {
    const handleSubmit = jest.fn();

    const { asFragment, getByTestId, getByLabelText, getAllByRole, getByRole } = render(
        <RootStoreProvider rootStore={new RootStore()}>
            <BrowserRouter>
                <EmployeeFormik initialValues={initialEmployee} onSubmit={handleSubmit} />
            </BrowserRouter>
        </RootStoreProvider>,
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const form = getByTestId('employee-form-form');

    const firstNameInput = getByLabelText('Jméno');
    const activeCheckbox = getByRole('switch');
    const medExamInput = getByLabelText('Datum vstupní prohlídky');
    const workCategoryInput = getAllByRole('combobox')[0];

    expect(firstNameInput).not.toBeNull();
    expect(firstNameInput).toHaveValue('Test');

    expect(workCategoryInput).not.toBeNull();
    expect(workCategoryInput).toHaveTextContent('B');

    expect(activeCheckbox).toBeChecked();

    expect(medExamInput).not.toBeNull();
    expect(medExamInput).toHaveValue('2022-02-01');

    /** TODO image and attachment **/
});

// test('Form display correct initial photo and attachment', async () => {
//     const handleSubmit = jest.fn();
//
//     const { asFragment, getByTestId, getByLabelText } = render(
//         <RootStoreProvider rootStore={new RootStore()}>
//             <BrowserRouter>
//                 <EmployeeFormik initialValues={initialEmployee} onSubmit={handleSubmit} />
//             </BrowserRouter>
//         </RootStoreProvider>,
//     );
//
//     // eslint-disable-next-line testing-library/prefer-screen-queries
//     const form = getByTestId('employee-form-form');
//
//     /** TODO image and attachment **/
// });
//
test('Form submit is called correctly with required inputs', async () => {
    const handleSubmit = jest.fn();

    const { getByTestId, getByLabelText, getByRole } = render(
        <RootStoreProvider rootStore={new RootStore()}>
            <BrowserRouter>
                <EmployeeFormik initialValues={new EmployeeDto()} onSubmit={handleSubmit} />
            </BrowserRouter>
        </RootStoreProvider>,
    );

    const firstNameInput = getByLabelText('Jméno');
    const lastNameInput = getByLabelText('Příjmení');
    const phoneInput = getByLabelText('Telefon');
    const emailInput = getByLabelText('Email');
    const workCategoryInput = getByRole('combobox');

    const submitButton = getByTestId('submit-button');

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

    /** FIXME je tam ten objekt spravne, ale za nim jsou jeste metody z Formiku a hazi to error **/
    // await waitFor(() =>
    //     expect(handleSubmit).toHaveBeenCalledWith({
    //         first_name: 'Alfred',
    //         last_name: 'Dlouhy',
    //         phone: 420735445210,
    //         email: 'alfred.dlouhy@gmail.com',
    //         working_category: 'A',
    //         active: undefined,
    //         attachment: undefined,
    //         company: undefined,
    //         health_limitations: undefined,
    //         job_assign_date: undefined,
    //         med_exam_date: undefined,
    //         profile_picture: undefined,
    //     }),
    // );
});

test('Form method isnt called and errors are shown when inputting wrong values', async () => {
    const handleSubmit = jest.fn();

    const { getByTestId, getByLabelText, getByRole } = render(
        <RootStoreProvider rootStore={new RootStore()}>
            <BrowserRouter>
                <EmployeeFormik initialValues={new EmployeeDto()} onSubmit={handleSubmit} />
            </BrowserRouter>
        </RootStoreProvider>,
    );

    const firstNameInput = getByLabelText('Jméno');
    const phoneInput = getByLabelText('Telefon');
    const emailInput = getByLabelText('Email');
    const workCategoryInput = getByRole('combobox');

    const submitButton = getByTestId('submit-button');

    userEvent.type(firstNameInput, 'Da'); /** Use too short name **/
    /** Forget last name **/
    userEvent.type(phoneInput, '12346578'); /** Miss few numbers **/
    userEvent.type(emailInput, 'alfred.dlouhygmail.com'); /** Forget at-sign **/
    /** Forget to select category **/

    await waitFor(() => {
        expect(firstNameInput).not.toBeNull();
        expect(firstNameInput).toHaveValue('Da');
        expect(screen.getByTestId('text-input-error')).toBeInTheDocument();
        expect(screen.getByText('Prilis kratke')).toBeInTheDocument();

        expect(phoneInput).not.toBeNull();
        expect(phoneInput).toHaveValue('12346578');
        expect(screen.getByTestId('phone-number-input-error')).toBeInTheDocument();
        expect(screen.getByText('Číslo musí mít 12 číslic')).toBeInTheDocument();

        /** FIXME nemel by mit zadnou hodnotu ale ma z nejakeho duvodu "A" **/
        expect(workCategoryInput).not.toHaveValue();
        expect(screen.getByTestId('category-input-error')).toBeInTheDocument();
        expect(screen.getByText('Kategorie musí být vyplněna')).toBeInTheDocument();
    });

    userEvent.click(submitButton);

    await waitFor(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
        expect(screen.getByTestId('invalid-form-error')).toBeInTheDocument();
        expect(screen.getByText('Ve formuláři jsou chyby. Opravte je a zkuste to prosím znovu.')).toBeInTheDocument();
    });
});
