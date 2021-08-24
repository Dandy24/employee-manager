import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
    text: string;
}

export function LoadingSpinner(props: LoadingSpinnerProps): JSX.Element {
    const { text } = props;

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div style={{ textAlign: 'center' }}>
            <Spin spinning indicator={antIcon}>
                {text}
            </Spin>
        </div>
    );
}
