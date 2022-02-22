import React from 'react';
import { Alert } from 'antd';
import { Input } from 'formik-antd';
import { useField } from 'formik';
import { observer } from 'mobx-react-lite';

export interface TextInputProps {
    label: string;
    name: string;
}

export const TextInput: React.FC<TextInputProps> = observer((props: TextInputProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta] = useField(props);
    const { label, name } = props;

    return (
        // <InputWrapper data-testid="text-input">
        <div data-testid={`${name}-text-input`}>
            <label htmlFor={name} data-testid="text-input-label">
                {label}
            </label>
            <Input id={name} name={name} data-testid="text-input-field" />
            {meta.touched && meta.error ? (
                <Alert message={meta.error} type="error" data-testid="text-input-error" />
            ) : null}
        </div>
        // </InputWrapper>
    );
});
