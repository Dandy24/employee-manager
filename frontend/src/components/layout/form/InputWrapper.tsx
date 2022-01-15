import React from 'react';
import { Space } from 'antd';
import { observer } from 'mobx-react-lite';

interface InputWrapperProps {
    children: React.ReactNode;
}

export const InputWrapper: React.FC<InputWrapperProps> = observer((props: InputWrapperProps): JSX.Element => {
    return (
        <div style={{ padding: '5px 0', width: '100%' }}>
            <Space size="large" style={{ width: '100%' }}>
                {props.children}
            </Space>
        </div>
    );
});
