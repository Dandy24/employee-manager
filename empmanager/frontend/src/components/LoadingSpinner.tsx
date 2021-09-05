import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

interface LoadingSpinnerProps {
    text: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = observer((props: LoadingSpinnerProps): JSX.Element => {
    const { text } = props;

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div style={{ textAlign: 'center' }}>
            <Spin spinning indicator={antIcon}>
                {text}
            </Spin>
        </div>
    );
});
