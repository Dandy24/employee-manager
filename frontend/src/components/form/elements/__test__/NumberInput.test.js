import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Form, Formik } from 'formik';
import userEvent from '@testing-library/user-event';
import { CompanyValidationSchema } from '../../CompanyForm';
import { NumberInput } from '../NumberInput';
import { act } from 'react-dom/test-utils';

test('Test typing words into number input', async () => {
    render(
        <Formik
            validationSchema={CompanyValidationSchema}
            initialValues={{
                phone: '',
            }}
        >
            <Form>
                <NumberInput label="Telefonni cislo" name="phone" />
            </Form>
        </Formik>,
    );

    await act(async () => {
        userEvent.click(await screen.findByTestId('phone-number-input-field'));
        userEvent.type(await screen.findByTestId('phone-number-input-field'), '123test123');
        fireEvent.blur(await screen.findByTestId('phone-number-input-field'));
    });

    await waitFor(async () => {
        expect(await screen.findByTestId('phone-number-input-field')).toBeEmptyDOMElement();
    });
});

test('Test typing number with invalid length', async () => {
    render(
        <Formik
            validationSchema={CompanyValidationSchema}
            initialValues={{
                phone: '',
            }}
        >
            <Form>
                <NumberInput label="Telefonni cislo" name="phone" />
            </Form>
        </Formik>,
    );

    userEvent.click(await screen.findByTestId('phone-number-input-field'));
    userEvent.type(await screen.findByTestId('phone-number-input-field'), '123456789');
    fireEvent.blur(await screen.findByTestId('phone-number-input-field'));

    await waitFor(async () => {
        expect(await screen.findByTestId('phone-number-input-field')).toHaveValue('123456789');
        expect(await screen.findByTestId('phone-number-input-error')).toBeInTheDocument();
        expect(await screen.findByText('Číslo musí mít přesně 12 číslic')).toBeInTheDocument();
    });
});
