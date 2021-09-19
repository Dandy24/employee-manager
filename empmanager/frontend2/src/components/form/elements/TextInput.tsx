import React from 'react';
import { Alert } from 'antd';
import { Input } from 'formik-antd';
import { useField } from 'formik';
import { SpaceSize } from 'antd/es/space';
import { InputWrapper } from '../../layout/form/InputWrapper';
import { observer } from 'mobx-react-lite';

export interface TextInputProps {
    label: string;
    spacesize: SpaceSize;
    name: string;
}

export const TextInput: React.FC<TextInputProps> = observer((props: TextInputProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta] = useField(props);
    const { label, spacesize, name } = props;

    return (
        <InputWrapper>
            <label htmlFor={name}>{label}</label>
            <Input name={name} />
            {meta.touched && meta.error ? <Alert message={meta.error} type="error" showIcon /> : null}
        </InputWrapper>
    );
});
