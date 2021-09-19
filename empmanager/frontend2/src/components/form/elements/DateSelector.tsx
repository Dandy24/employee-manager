import { DatePicker } from 'formik-antd';
import React from 'react';
import { SpaceSize } from 'antd/es/space';
import { InputWrapper } from '../../layout/form/InputWrapper';
import { PickerMode } from 'rc-picker/lib/interface';
import { observer } from 'mobx-react-lite';

export interface DateSelectorProps {
    name: string;
    label: string;
    spacesize: SpaceSize;
    picker?: Exclude<PickerMode, 'date' | 'time'>;
}

export const DateSelector: React.FC<DateSelectorProps> = observer((props: DateSelectorProps): JSX.Element => {
    const { name, spacesize, label, picker } = props;

    return (
        <InputWrapper>
            <label htmlFor={name}>{label}</label>
            {picker ? <DatePicker name={name} picker={picker} /> : <DatePicker name={name} />}
        </InputWrapper>
    );
});
