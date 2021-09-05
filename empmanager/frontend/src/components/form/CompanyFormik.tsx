import { Formik } from 'formik';
import React from 'react';
import { observer } from 'mobx-react-lite';

export interface CompanyFormikProps {
    onSubmit: (values: any) => void;
    initialValues: any; //TODO type
    children: React.ReactNode;
}

export const CompanyFormik: React.FC<CompanyFormikProps> = observer((props: CompanyFormikProps): JSX.Element => {
    const { initialValues, onSubmit } = props;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {props.children}
        </Formik>
    );
});
