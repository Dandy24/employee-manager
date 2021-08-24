import React from 'react';
import { Formik } from 'formik';

export interface EmployeeFormikProps {
    first_name: string;
    last_name: string;
    phone: number;
    email: string;
    category: string;
    health_limits: string;
    onSubmit: (values: any) => void;
    children: React.ReactNode;
}

export function EmployeeFormik(props: EmployeeFormikProps): JSX.Element {
    const { first_name, last_name, phone, email, category, health_limits, onSubmit } = props;

    return (
        <Formik
            initialValues={{
                first_name: first_name,
                last_name: last_name,
                //phone: phone,
                email: email,
                category: category,
                health_limits: health_limits,
            }}
            onSubmit={onSubmit}
        >
            {props.children}
        </Formik>
    );
}
