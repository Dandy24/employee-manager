import { Select } from 'formik-antd';
import { SelectProps } from 'antd/lib/select';
import { SpaceSize } from 'antd/es/space';
import { InputWrapper } from '../../layout/form/InputWrapper';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { WorkingCategoryEnum } from '../../../models/enums/working-category-enum';

export interface SelectListProps extends SelectProps<any> {
    name: string;
    label: string;
    spacesize: SpaceSize;
}

export const CategorySelectList: React.FC<SelectListProps> = observer((props: SelectListProps): JSX.Element => {
    const { name, label, spacesize } = props;

    return (
        <InputWrapper>
            <label htmlFor={name}>{label}</label>
            <Select name={name} style={{ width: 200 }}>
                <Select.Option key={WorkingCategoryEnum.A} value={WorkingCategoryEnum.A}>
                    {WorkingCategoryEnum.A}
                </Select.Option>
                <Select.Option key={WorkingCategoryEnum.B} value={WorkingCategoryEnum.B}>
                    {WorkingCategoryEnum.B}
                </Select.Option>
                <Select.Option key={WorkingCategoryEnum.C} value={WorkingCategoryEnum.C}>
                    {WorkingCategoryEnum.C}
                </Select.Option>
            </Select>
        </InputWrapper>
    );
});
