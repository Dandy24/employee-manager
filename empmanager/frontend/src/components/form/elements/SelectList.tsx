import { Select } from 'formik-antd';
import { SelectProps } from 'antd/lib/select';
import {Space} from "antd";
import {SpaceSize} from "antd/es/space";

export interface SelectListProps extends SelectProps<any>{
    categories: string[]
    name: string
    label: string
    spacesize: SpaceSize
}

export function CategorySelectList(props: SelectListProps): JSX.Element {
    const { categories, name, label, spacesize } = props;

    return (
        <div>
            <Space size={spacesize}>
                <label htmlFor={name}>{label}</label>
                <Select name={name} style={{ width: 200 }}>
                    {categories.map((category) => (
                        <Select.Option key={category} value={category}>{category}</Select.Option>
                    ))}
                </Select>
            </Space>
        </div>
    );
}
