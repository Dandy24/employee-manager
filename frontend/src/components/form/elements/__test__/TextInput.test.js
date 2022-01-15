import { findByTestId, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TextInput } from '../TextInput';
import React from 'react';
import { Form, Formik } from 'formik';
import userEvent from '@testing-library/user-event';
import { CompanyValidationSchema } from '../../CompanyFormik';

test('TextInput snapshot matches the previous one', async () => {
    const { asFragment } = render(
        <Formik
            validationSchema={CompanyValidationSchema}
            initialValues={{
                name: '',
            }}
        >
            <Form>
                <TextInput label="Nazev firmy" name="name" />
            </Form>
        </Formik>,
    );

    expect(asFragment()).toMatchSnapshot();
});

test('Test correct value in text input after user types', async () => {
    const { getByTestId, getByLabelText, findByTestId } = render(
        <Formik
            validationSchema={CompanyValidationSchema}
            initialValues={{
                name: '',
            }}
        >
            <Form>
                <TextInput label="Nazev firmy" name="name" />
            </Form>
        </Formik>,
    );

    const textField = screen.getByTestId('text-input-field');

    userEvent.type(screen.getByTestId('text-input-field'), 'test');
    fireEvent.blur(screen.getByTestId('text-input-field'));

    await waitFor(() => {
        expect(textField).toHaveDisplayValue('test');
        expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();
    });
});

test('Test missing value validation in text input', async () => {
    const { getByTestId, getByLabelText, findByTestId } = render(
        <Formik
            validationSchema={CompanyValidationSchema}
            initialValues={{
                name: '',
            }}
        >
            <Form>
                <TextInput label="Nazev firmy" name="name" />
            </Form>
        </Formik>,
    );

    userEvent.click(screen.getByTestId('text-input-field'));
    fireEvent.blur(screen.getByTestId('text-input-field'));

    await waitFor(() => {
        expect(screen.getByTestId('text-input-error')).toBeInTheDocument();
        expect(screen.getByText('Pole musí být vyplněné')).toBeInTheDocument();
    });
});

test('Test valid value validation in text input', async () => {
    const { getByTestId, getByLabelText, findByTestId } = render(
        <Formik
            validationSchema={CompanyValidationSchema}
            initialValues={{
                name: '',
            }}
        >
            <Form>
                <TextInput label="Nazev spolecnosti" name="name" />
            </Form>
        </Formik>,
    );

    userEvent.click(screen.getByTestId('text-input-field'));
    userEvent.type(
        screen.getByTestId('text-input-field'),
        'This text is longer than 50 characters.................................................',
    );
    fireEvent.blur(screen.getByTestId('text-input-field'));

    await waitFor(() => {
        expect(screen.getByTestId('text-input-error')).toBeInTheDocument();
        expect(screen.getByText('Maximalni povolena delka prekrocena')).toBeInTheDocument();
    });
});
