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
        <div data-testid={`${name}-number-input`}>
            <label htmlFor={name} data-testid="number-input-label">
                {label}
            </label>
            <InputNumber {...props} data-testid="number-input-field" />
            {meta.touched && meta.error ? (
                <Alert message={meta.error} type="error" showIcon data-testid="number-input-error" />
            ) : null}
        </div>
    );
});
