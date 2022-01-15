import React from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { EmployeeDto } from '../../models/dtos/employee-dto';
import * as yup from 'yup';
import { EmployeeEntity } from '../../models/entities/employee-entity';

export interface EmployeeFormikProps {
    initialValues: EmployeeDto | EmployeeEntity;
    onSubmit: (values: EmployeeDto) => void;
    children: React.ReactNode;
}

export const EmployeeValidationSchema = yup.object({
    first_name: yup.string().required('Pole musí být vyplněné'),
    last_name: yup.string().required('Pole musí být vyplněné'),
    phone: yup
        .string()
        .typeError('Musi byt vyplneno')
        .required('Musi byt vyplneno')
        .matches(/^[0-9]+$/, 'Povoleny jsou pouze číslice')
        .min(12, 'Číslo musí mít 12 číslic')
        .max(12, 'Číslo musí mít 12 číslic'),
    email: yup.string().email('Neplatný formát emailu'),
    med_exam_date: yup.date(),
    job_assign_date: yup.date(),
    health_limitations: yup.string().max(100, 'Překročena maximální délka poznámky'),
});

export const EmployeeFormik: React.FC<EmployeeFormikProps> = observer((props: EmployeeFormikProps): JSX.Element => {
    const { initialValues, onSubmit } = props;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={EmployeeValidationSchema}
            enableReinitialize
        >
            {props.children}
        </Formik>
    );
});
