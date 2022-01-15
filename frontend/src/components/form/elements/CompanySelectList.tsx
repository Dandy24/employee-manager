import React from 'react';
import { Select } from 'formik-antd';
import { observer } from 'mobx-react-lite';
import { CompanyEntity } from '../../../models/entities/company-entity';

export interface CompanySelectListProps {
    companies: CompanyEntity[];
    name: string;
    label: string;
}

export const CompanySelectList: React.FC<CompanySelectListProps> = observer(
    (props: CompanySelectListProps): JSX.Element => {
        const { companies, name, label } = props;

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <Select name={name} style={{ width: '100%' }}>
                    {companies.map((company) => (
                        <Select.Option key={company.id} value={company.id}>
                            {company.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
        );
    },
);
