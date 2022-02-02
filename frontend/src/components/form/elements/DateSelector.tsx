import { DatePicker } from 'formik-antd';
import React from 'react';
import { InputWrapper } from '../../layout/form/InputWrapper';
import { PickerMode } from 'rc-picker/lib/interface';
import { observer } from 'mobx-react-lite';

export interface DateSelectorProps {
    name: string;
    label: string;
    picker?: Exclude<PickerMode, 'date' | 'time'>;
}

export const DateSelector: React.FC<DateSelectorProps> = observer((props: DateSelectorProps): JSX.Element => {
    const { name, label, picker } = props;

    return (
        <InputWrapper>
            <label htmlFor={name}>{label}</label>
            <br />
            {picker ? (
                <DatePicker id={name} name={name} picker={picker} style={{ width: '100%' }} />
            ) : (
                <DatePicker id={name} name={name} style={{ width: '100%' }} />
            )}
        </InputWrapper>
    );
});
