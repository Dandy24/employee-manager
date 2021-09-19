import { Alert } from 'antd';
import { InputNumber } from 'formik-antd';
import { useField } from 'formik';
import { SpaceSize } from 'antd/es/space';
import { InputWrapper } from '../../layout/form/InputWrapper';
import React from 'react';
import { observer } from 'mobx-react-lite';

export interface NumberInputProps {
    label: string;
    spacesize: SpaceSize;
    name: string;
}

export const NumberInput: React.FC<NumberInputProps> = observer((props: NumberInputProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta] = useField(props);
    const { label, spacesize, name } = props;

    return (
        <InputWrapper>
            <label htmlFor={name}>{label}</label>
            <InputNumber {...props} />
            {meta.touched && meta.error ? <Alert message={meta.error} type="error" showIcon /> : null}
        </InputWrapper>
    );
});
