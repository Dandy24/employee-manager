import React from 'react';
import { Row } from 'antd';

export function FormWrapper(props: { children: React.ReactNode }): JSX.Element {
    return <Row justify="center">{props.children}</Row>;
}
