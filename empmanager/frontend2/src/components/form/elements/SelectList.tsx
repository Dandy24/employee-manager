import { Select } from 'formik-antd';
import { SelectProps } from 'antd/lib/select';
import { SpaceSize } from 'antd/es/space';
import { InputWrapper } from '../../layout/form/InputWrapper';
import React from 'react';
import { observer } from 'mobx-react-lite';

export interface SelectListProps extends SelectProps<any> {
    categories: string[];
    name: string;
    label: string;
    spacesize: SpaceSize;
}

export const CategorySelectList: React.FC<SelectListProps> = observer((props: SelectListProps): JSX.Element => {
    const { categories, name, label, spacesize } = props;

    return (
        <InputWrapper>
            <label htmlFor={name}>{label}</label>
            <Select name={name} style={{ width: 200 }}>
                {categories.map((category) => (
                    <Select.Option key={category} value={category}>
                        {category}
                    </Select.Option>
                ))}
            </Select>
        </InputWrapper>
    );
});
