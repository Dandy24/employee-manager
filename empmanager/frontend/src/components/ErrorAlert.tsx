import React from 'react';
import { Alert } from 'antd';
import { observer } from 'mobx-react-lite';

export interface ErrorAlertProps {
    title: string;
    description: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = observer((props: ErrorAlertProps): JSX.Element => {
    const { title, description } = props;

    return <Alert message={title} description={description} type="error" showIcon />;
});
