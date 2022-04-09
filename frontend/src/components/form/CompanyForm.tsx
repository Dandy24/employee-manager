import { Form, Formik } from 'formik';
import { TextInput } from './elements/TextInput';
import { NumberInput } from './elements/NumberInput';
import { Alert, Button, Col, Row } from 'antd';
import React from 'react';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';
import { CompanyDto } from '../../models/dtos/company-dto';
import { ImageUpload } from './elements/image-upload';
import { CompanyEntity } from '../../models/entities/company-entity';

export interface CompanyFormProps {
    onSubmit: (values: CompanyDto) => void;
    initialValues: CompanyDto | CompanyEntity;
    companyName: string;
    companyPhone: string;
    companyAddress: string;
    companyNameLabel: string;
    companyPhoneLabel: string;
    companyAddressLabel: string;
    profile_pic: string | null;
    setProfilePic: React.Dispatch<string | ArrayBuffer>;
}

export const CompanyValidationSchema = yup.object({
    name: yup
        .string()
        .typeError('Špatný formát jména')
        .required('Pole musí být vyplněné')
        .max(50, 'Maximální povolená délka překročena'),
    phone: yup
        .string()
        .typeError('Pole musí být vyplněné')
        .required('Pole musí být vyplněné')
        .matches(/^[0-9]+$/, 'Povoleny jsou pouze číslice')
        .min(12, 'Číslo musí mít přesně 12 číslic')
        .max(12, 'Číslo musí mít přesně 12 číslic'),
    address: yup.string().typeError('Špatný formát adresy').required('Pole musí být vyplněné'),
});

export const CompanyForm: React.FC<CompanyFormProps> = observer((props: CompanyFormProps): JSX.Element => {
    const {
        companyName,
        companyPhone,
        companyAddress,
        companyAddressLabel,
        companyNameLabel,
        companyPhoneLabel,
        onSubmit,
        initialValues,
        setProfilePic,
        profile_pic,
    } = props;

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={onSubmit}
            validationSchema={CompanyValidationSchema}
        >
            {({ setFieldValue, errors, values, submitCount, isValid }) => (
                <Form style={{ width: '80%', marginLeft: '9%' }} data-testid="company-form-form">
                    {!isValid && submitCount > 0 && (
                        <Alert
                            type={'error'}
                            message={'Ve formuláři jsou chyby. Opravte je a zkuste to prosím znovu.'}
                            style={{ marginBottom: '10%' }}
                            showIcon
                            data-testid={'invalid-form-error'}
                        />
                    )}
                    <Row justify="center">
                        <div data-testid={'company-form'} style={{ width: '100%' }}>
                            <Row justify="center">
                                <Col>
                                    <ImageUpload
                                        initialValue={initialValues?.profile_picture}
                                        value={values?.profile_picture}
                                        error={errors?.profile_picture}
                                        setFieldValue={setFieldValue}
                                        name={'profile_picture'}
                                        setProfilePic={setProfilePic}
                                        profile_pic={profile_pic}
                                    />
                                </Col>
                            </Row>

                            <div style={{ marginTop: '4.5%' }}></div>

                            <TextInput label={companyNameLabel} name={companyName} />
                            <NumberInput label={companyPhoneLabel} name={companyPhone} />
                            <TextInput label={companyAddressLabel} name={companyAddress} />

                            <Col span={12} offset={9} style={{ marginTop: '3vh' }}>
                                <Button type="primary" htmlType="submit">
                                    Uložit
                                </Button>
                            </Col>
                        </div>
                    </Row>
                </Form>
            )}
        </Formik>
    );
});
