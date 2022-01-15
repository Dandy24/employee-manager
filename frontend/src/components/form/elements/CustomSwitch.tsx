import { Switch } from 'formik-antd';
import React from 'react';
import { NumberInputProps } from './NumberInput';
import { observer } from 'mobx-react-lite';
import { Col, Row } from 'antd';

export const CustomSwitch: React.FC<NumberInputProps> = observer((props: NumberInputProps): JSX.Element => {
    const { name, label } = props;

    return (
        <Row justify={'space-between'}>
            <Col>
                <label htmlFor={name}>{label}</label>
            </Col>
            <Col>
                <Switch name="active" />
            </Col>
        </Row>
    );
});
