import React from 'react';
import { Input } from 'formik-antd';
import { SpaceSize } from 'antd/es/space';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { InputWrapper } from '../../layout/form/InputWrapper';
import { observer } from 'mobx-react-lite';
import { Alert } from 'antd';
import { useField } from 'formik';

export interface TextAreaProps {
    name: string;
    label: string;
    spacesize: SpaceSize;
    textareaSize: SizeType;
    rows: number;
}

export const TextArea: React.FC<TextAreaProps> = observer((props: TextAreaProps): JSX.Element => {
    const { name, label, spacesize, rows, textareaSize } = props;

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
