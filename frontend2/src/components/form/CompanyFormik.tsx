import { Formik } from 'formik';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { CompanyDto } from '../../models/dtos/company-dto';
import * as yup from 'yup';

export interface CompanyFormikProps {
    onSubmit: (values: CompanyDto) => void;
    initialValues: CompanyDto;
    children: React.ReactNode;
}

export const CompanyValidationSchema = yup.object({
    name: yup
        .string()
        .typeError('Spatne zadane jmeno')
        .required('Pole musí být vyplněné')
        .max(50, 'Maximalni povolena delka prekrocena'),
    phone: yup
        .string()
        .typeError('Pole musí být vyplněné')
        .required('Pole musí být vyplněné')
        .matches(/^[0-9]+$/, 'Povoleny jsou pouze číslice')
        .min(12, 'Číslo musí mít 12 číslic')
        .max(12, 'Číslo musí mít 12 číslic'),
    address: yup.string().typeError('Spatna adresa').required('Pole musí být vyplněné'),
});

export const CompanyFormik: React.FC<CompanyFormikProps> = observer((props: CompanyFormikProps): JSX.Element => {
    const { initialValues, onSubmit } = props;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={CompanyValidationSchema}>
            {props.children}
        </Formik>
    );
});
