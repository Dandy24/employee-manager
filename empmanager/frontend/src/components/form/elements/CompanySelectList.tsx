import { Select } from 'formik-antd';
import { SelectProps } from 'antd/lib/select';
import {Space} from "antd";
import {SpaceSize} from "antd/es/space";

export interface CompanySelectListProps extends SelectProps<any>{
    companies: any[] //TODO fix type
    name: string
    label: string
    spacesize: SpaceSize
}

export function CompanySelectList(props: CompanySelectListProps): JSX.Element {
    const { companies, name, label, spacesize } = props;

    return (
        <div>
            <Space size={spacesize}>
                <label htmlFor={name}>{label}</label>
                <Select name={name} style={{ width: 200 }}>
                    {companies.map((company) => (
                        <Select.Option key={company.id} value={company.id}>{company.name}</Select.Option>
                    ))}
                </Select>
            </Space>
        </div>
    );
}
