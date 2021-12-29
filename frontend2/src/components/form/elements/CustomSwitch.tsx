import { Switch } from 'formik-antd';
import React from 'react';
import { NumberInputProps } from './NumberInput';
import { InputWrapper } from '../../layout/form/InputWrapper';
import { observer } from 'mobx-react-lite';

export const CustomSwitch: React.FC<NumberInputProps> = observer((props: NumberInputProps): JSX.Element => {
    const { name, label } = props;

    return (
        <InputWrapper>
            <label htmlFor={name}>{label}</label>
            <Switch name="active" />
        </InputWrapper>
    );
});
