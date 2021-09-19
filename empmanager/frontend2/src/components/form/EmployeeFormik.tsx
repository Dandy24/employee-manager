import React from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';

export interface EmployeeFormikProps {
    // first_name: string;
    // last_name: string;
    // phone: number;
    // email: string;
    // category: string;
    // health_limits: string;
    initialValues: any;
    onSubmit: (values: any) => void;
    children: React.ReactNode;
}

export const EmployeeFormik: React.FC<EmployeeFormikProps> = observer((props: EmployeeFormikProps): JSX.Element => {
    const { initialValues, onSubmit } = props;

    //console.log(initialValues);

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {props.children}
        </Formik>
    );
});
