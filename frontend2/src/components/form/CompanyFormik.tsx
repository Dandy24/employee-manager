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

export const NewCompanyValidationSchema = yup.object({
    name: yup.number().typeError('Not a number').required('Missing'),
});

export const CompanyFormik: React.FC<CompanyFormikProps> = observer((props: CompanyFormikProps): JSX.Element => {
    const { initialValues, onSubmit } = props;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={NewCompanyValidationSchema}>
            {props.children}
        </Formik>
    );
});
