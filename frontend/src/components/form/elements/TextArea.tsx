import React from 'react';
import { Input } from 'formik-antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { observer } from 'mobx-react-lite';
import { Alert } from 'antd';
import { useField } from 'formik';

export interface TextAreaProps {
    name: string;
    label: string;
    textareaSize: SizeType;
    rows: number;
}

export const TextArea: React.FC<TextAreaProps> = observer((props: TextAreaProps): JSX.Element => {
    const { name, label, rows, textareaSize } = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta] = useField(props);
    const { TextArea } = Input;

    return (
        // <InputWrapper>
        <div data-testid={`${name}-text-area`}>
            <label data-testid="text-area-label" htmlFor={name}>
                {label}
            </label>
            <TextArea data-testid="text-area-input" name={name} rows={rows} size={textareaSize} />
            {meta.error ? <Alert data-testid="text-area-error" message={meta.error} type="error" showIcon /> : null}
        </div>
        // </InputWrapper>
    );
});
