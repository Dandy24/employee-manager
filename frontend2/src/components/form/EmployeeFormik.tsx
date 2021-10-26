import React from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { EmployeeDto } from '../../models/dtos/employee-dto';
import * as yup from 'yup';

export interface EmployeeFormikProps {
    initialValues: EmployeeDto;
    onSubmit: (values: EmployeeDto) => void;
    children: React.ReactNode;
}

export const EmployeeFormik: React.FC<EmployeeFormikProps> = observer((props: EmployeeFormikProps): JSX.Element => {
    const { initialValues, onSubmit } = props;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={yup.object({
                first_name: yup.string().required('Pole musí být vyplněné'),
                last_name: yup.string().required('Pole musí být vyplněné'),
                phone: yup
                    .string()
                    .required()
                    .matches(/^[0-9]+$/, 'Povoleny jsou pouze číslice')
                    .min(9, 'Číslo musí mít 9 číslic')
                    .max(9, 'Číslo musí mít 9 číslic'),
                email: yup.string().email('Neplatný formát'),
                med_exam_date: yup.date(),
                job_assign_date: yup.date(),
                health_limitations: yup.string().max(100, 'Překročena maximální délka poznámky'),
            })}
        >
            {props.children}
        </Formik>
    );
});
