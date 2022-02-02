import { findByTestId, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Form, Formik } from 'formik';
import userEvent from '@testing-library/user-event';
import { CompanyValidationSchema } from '../../CompanyFormik';
import { NumberInput } from '../NumberInput';
import { act } from 'react-dom/test-utils';

test('Test typing words into number input', async () => {
    const { getByTestId, getByLabelText, findByTestId } = render(
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
        userEvent.click(screen.getByTestId('phone-number-input-field'));
        userEvent.type(screen.getByTestId('phone-number-input-field'), '123test123');
        fireEvent.blur(screen.getByTestId('phone-number-input-field'));
    });

    await waitFor(() => {
        expect(screen.getByTestId('phone-number-input-field')).toBeEmptyDOMElement();
    });
});

test('Test typing number with invalid length', async () => {
    const { getByTestId, getByLabelText, findByTestId } = render(
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

    userEvent.click(screen.getByTestId('phone-number-input-field'));
    userEvent.type(screen.getByTestId('phone-number-input-field'), '123456789');
    fireEvent.blur(screen.getByTestId('phone-number-input-field'));

    await waitFor(() => {
        expect(screen.getByTestId('phone-number-input-field')).toHaveValue('123456789');
        expect(screen.getByTestId('phone-number-input-error')).toBeInTheDocument();
        expect(screen.getByText('Číslo musí mít 12 číslic')).toBeInTheDocument();
    });
});
