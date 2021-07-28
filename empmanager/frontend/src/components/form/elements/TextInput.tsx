import {Space, Alert} from 'antd';
import { Input } from 'formik-antd';
import { useField } from 'formik';
import { SpaceSize } from 'antd/es/space';

export interface TextInputProps{
    label: string,
    spacesize: SpaceSize,
    name: string,
}

export function TextInput(props: TextInputProps): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta] = useField(props);
    const { label, spacesize, name } = props;

    return (
        <div>
            <Space size={spacesize}>
                <label htmlFor={name}>{label}</label>
                <Input name={name} />
                {meta.touched && meta.error
                    ? (
                        <Alert
                            message={meta.error}
                            type="error"
                            showIcon
                        />
                    ) : null}
            </Space>
        </div>
    );
}
