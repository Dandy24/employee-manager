import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
    render(
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

    const textField = await screen.findByTestId('text-input-field');

    userEvent.type(await screen.findByTestId('text-input-field'), 'test');
    fireEvent.blur(await screen.findByTestId('text-input-field'));

    await waitFor(() => {
        expect(textField).toHaveDisplayValue('test');
        expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();
    });
});

test('Test missing value validation in text input', async () => {
    render(
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

    userEvent.click(await screen.findByTestId('text-input-field'));
    fireEvent.blur(await screen.findByTestId('text-input-field'));

    await waitFor(async () => {
        expect(await screen.findByTestId('text-input-error')).toBeInTheDocument();
        expect(await screen.findByText('Pole musí být vyplněné')).toBeInTheDocument();
    });
});

test('Test valid value validation in text input', async () => {
    render(
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

    userEvent.click(await screen.findByTestId('text-input-field'));
    userEvent.type(
        await screen.findByTestId('text-input-field'),
        'This text is longer than 50 characters.................................................',
    );
    fireEvent.blur(await screen.findByTestId('text-input-field'));

    await waitFor(async () => {
        expect(await screen.findByTestId('text-input-error')).toBeInTheDocument();
        expect(await screen.findByText('Maximální povolená délka překročena')).toBeInTheDocument();
    });
});
