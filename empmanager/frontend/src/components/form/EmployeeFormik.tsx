import React from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { EmployeeDto } from '../../models/dtos/employee-dto';

export interface EmployeeFormikProps {
    initialValues: EmployeeDto;
    onSubmit: (values: EmployeeDto) => void;
    children: React.ReactNode;
}

export const EmployeeFormik: React.FC<EmployeeFormikProps> = observer((props: EmployeeFormikProps): JSX.Element => {
    const { initialValues, onSubmit } = props;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {props.children}
        </Formik>
    );
});
