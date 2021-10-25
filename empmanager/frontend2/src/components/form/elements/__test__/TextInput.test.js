import { findByTestId, fireEvent, queryByText, render, screen, waitFor, within } from '@testing-library/react';
import { TextInput } from '../TextInput';
import React, { useRef } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import userEvent from '@testing-library/user-event';
import { RootStoreProvider, useRootStore } from '../../../../stores/root-store-provider';
import { NewCompanyValidationSchema } from '../../CompanyFormik';

test('TextInput snapshot matches the previous one', async () => {
    const { asFragment } = render(
        <Formik
            validationSchema={NewCompanyValidationSchema}
            initialValues={{
                name: '',
            }}
        >
            <Form>
                <TextInput label="Nazev firmy" spacesize="large" name="name" />
            </Form>
        </Formik>,
    );

    expect(asFragment()).toMatchSnapshot();
});

test('Test correct value in text input after user types', async () => {
    const { getByTestId, getByLabelText, findByTestId } = render(
        <Formik
            validationSchema={NewCompanyValidationSchema}
            initialValues={{
                name: '',
            }}
        >
            <Form>
                <TextInput label="Nazev firmy" spacesize="large" name="name" />
            </Form>
        </Formik>,
    );

    const textField = screen.getByTestId('text-input-field');

    userEvent.type(screen.getByTestId('text-input-field'), 'kok');
    //fireEvent.blur(screen.getByTestId('text-input-field'));

    await waitFor(() => {
        expect(textField).toHaveDisplayValue('kok');
        expect(screen.queryByTestId('text-input-error')).not.toBeInTheDocument();
    });
});

test('Test missing value validation in text input', async () => {
    const { getByTestId, getByLabelText, findByTestId } = render(
        <Formik
            validationSchema={NewCompanyValidationSchema}
            initialValues={{
                name: '',
            }}
        >
            <Form>
                <TextInput label="Nazev firmy" spacesize="large" name="name" />
            </Form>
        </Formik>,
    );

    userEvent.click(screen.getByTestId('text-input-field'));
    //userEvent.type(screen.getByTestId('text-input-field'), 'kok');
    fireEvent.blur(screen.getByTestId('text-input-field'));

    await waitFor(() => {
        expect(screen.getByTestId('text-input-error')).toBeInTheDocument();
        expect(screen.getByText('Missing')).toBeInTheDocument();
    });
});

test('Test valid value validation in text input', async () => {
    const { getByTestId, getByLabelText, findByTestId } = render(
        <Formik
            validationSchema={NewCompanyValidationSchema}
            initialValues={{
                name: '',
            }}
        >
            <Form>
                <TextInput label="Nazev firmy" spacesize="large" name="name" />
            </Form>
        </Formik>,
    );

    userEvent.click(screen.getByTestId('text-input-field'));
    userEvent.type(screen.getByTestId('text-input-field'), 'kok');
    fireEvent.blur(screen.getByTestId('text-input-field'));

    await waitFor(() => {
        expect(screen.getByTestId('text-input-error')).toBeInTheDocument();
        expect(screen.getByText('Not a number')).toBeInTheDocument();
    });
});
