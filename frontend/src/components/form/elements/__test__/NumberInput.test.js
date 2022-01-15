import { findByTestId, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Form, Formik } from 'formik';
import userEvent from '@testing-library/user-event';
import { CompanyValidationSchema } from '../../CompanyFormik';
import { NumberInput } from '../NumberInput';

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

    userEvent.click(screen.getByTestId('number-input-field'));
    userEvent.type(screen.getByTestId('number-input-field'), '123test123');
    fireEvent.blur(screen.getByTestId('number-input-field'));

    await waitFor(() => {
        expect(screen.getByTestId('number-input-field')).toBeEmpty();
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

    userEvent.click(screen.getByTestId('number-input-field'));
    userEvent.type(screen.getByTestId('number-input-field'), '123456789');
    fireEvent.blur(screen.getByTestId('number-input-field'));

    await waitFor(() => {
        expect(screen.getByTestId('number-input-field')).toHaveValue('123456789');
        expect(screen.getByTestId('number-input-error')).toBeInTheDocument();
        expect(screen.getByText('Číslo musí mít 12 číslic')).toBeInTheDocument();
    });
});
