import { Form } from 'formik';
import { TextInput } from './elements/TextInput';
import { NumberInput } from './elements/NumberInput';
import { Button, Col, Row, Space } from 'antd';
import React from 'react';

export interface CompanyFormProps {
    companyName: string;
    companyPhone: string;
    companyAddress: string;
    companyNameLabel: string;
    companyPhoneLabel: string;
    companyAddressLabel: string;
}

export function CompanyForm(props: CompanyFormProps): JSX.Element {
    const { companyName, companyPhone, companyAddress, companyAddressLabel, companyNameLabel, companyPhoneLabel } =
        props;

    return (
        <Form>
            {/*<FormWrapper>*/}
            <Row justify="center">
                <Col span={12}>
                    <TextInput label={companyNameLabel} spacesize="large" name={companyName} />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={12}>
                    <NumberInput label={companyPhoneLabel} spacesize="large" name={companyPhone} />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={12}>
                    <TextInput label={companyAddressLabel} spacesize="large" name={companyAddress} />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={12}>
                    <Button type="primary" htmlType="submit">
                        Uložit
                    </Button>
                </Col>
            </Row>
            {/*</FormWrapper>*/}
        </Form>
    );
}
