import { Select } from 'formik-antd';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { WorkingCategoryEnum } from '../../../models/enums/working-category-enum';
import { useField } from 'formik';
import { Alert } from 'antd';

export interface SelectListProps {
    name: string;
    label: string;
}

export const CategorySelectList: React.FC<SelectListProps> = observer((props: SelectListProps): JSX.Element => {
    const { name, label } = props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta] = useField(props);

    return (
        <div data-testid={`${name}-category-select`}>
            <label htmlFor={name} data-testid="category-select-label">
                {label}
            </label>
            <br />
            <Select id={name} name={name} style={{ width: '100%' }} data-testid="category-select-input">
                <Select.Option
                    key={WorkingCategoryEnum.A}
                    value={WorkingCategoryEnum.A}
                    data-testid={`category-select-option-${WorkingCategoryEnum.A}`}
                >
                    {WorkingCategoryEnum.A}
                </Select.Option>
                <Select.Option
                    key={WorkingCategoryEnum.B}
                    value={WorkingCategoryEnum.B}
                    data-testid={`category-select-option-${WorkingCategoryEnum.B}`}
                >
                    {WorkingCategoryEnum.B}
                </Select.Option>
                <Select.Option
                    key={WorkingCategoryEnum.C}
                    value={WorkingCategoryEnum.C}
                    data-testid={`category-select-option-${WorkingCategoryEnum.C}`}
                >
                    {WorkingCategoryEnum.C}
                </Select.Option>
            </Select>
            {meta.touched && meta.error ? (
                <Alert message={meta.error} type="error" data-testid="category-input-error" />
            ) : null}
        </div>
    );
});
