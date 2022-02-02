import { Alert } from 'antd';
import { InputNumber } from 'formik-antd';
import { useField } from 'formik';
import React from 'react';
import { observer } from 'mobx-react-lite';

export interface NumberInputProps {
    label: string;
    name: string;
}

export const NumberInput: React.FC<NumberInputProps> = observer((props: NumberInputProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta] = useField(props);
    const { label, name } = props;

    return (
        <div data-testid={`${name}-number-input`}>
            <label htmlFor={name} data-testid={`${name}-number-input-label`}>
                {label}
            </label>
            <InputNumber id={name} {...props} data-testid={`${name}-number-input-field`} style={{ width: '100%' }} />
            {meta.touched && meta.error ? (
                <Alert message={meta.error} type="error" data-testid={`${name}-number-input-error`} />
            ) : null}
        </div>
    );
});
