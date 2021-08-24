import { Formik } from 'formik';
import React from 'react';

export interface CompanyFormikProps {
    onSubmit: (values: any) => void;
    initialValues: any; //TODO type
    children: React.ReactNode;
}

export function CompanyFormik(props: CompanyFormikProps): JSX.Element {
    const { initialValues, onSubmit } = props;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {props.children}
        </Formik>
    );
}
