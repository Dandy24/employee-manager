import React from 'react';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { EmployeeDto } from '../../models/dtos/employee-dto';
import * as yup from 'yup';
import { EmployeeEntity } from '../../models/entities/employee-entity';
import { Button, Col, Row, Upload } from 'antd';
import { TextInput } from './elements/TextInput';
import { NumberInput } from './elements/NumberInput';
import { CategorySelectList } from './elements/SelectList';
import { DateSelector } from './elements/DateSelector';
import { TextArea } from './elements/TextArea';
import { CustomSwitch } from './elements/CustomSwitch';
import { CompanySelectList } from './elements/CompanySelectList';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { useRootStore } from '../../stores/root-store-provider';

export interface EmployeeFormikProps {
    initialValues: EmployeeDto | EmployeeEntity;
    onSubmit: (values: EmployeeDto) => void;
}

export const EmployeeValidationSchema = yup.object({
    first_name: yup.string().required('Pole musí být vyplněné'),
    last_name: yup.string().required('Pole musí být vyplněné'),
    phone: yup
        .string()
        .typeError('Musi byt vyplneno')
        .required('Musi byt vyplneno')
        .matches(/^[0-9]+$/, 'Povoleny jsou pouze číslice')
        .min(12, 'Číslo musí mít 12 číslic')
        .max(12, 'Číslo musí mít 12 číslic'),
    email: yup.string().email('Neplatný formát emailu'),
    med_exam_date: yup.date(),
    job_assign_date: yup.date(),
    health_limitations: yup.string().max(100, 'Překročena maximální délka poznámky'),
});

export const EmployeeFormik: React.FC<EmployeeFormikProps> = observer((props: EmployeeFormikProps): JSX.Element => {
    const { initialValues, onSubmit } = props;

    const rootStore = useRootStore();

    const { companyStore } = rootStore;

    const dummyRequest = (options) => {
        const { onSuccess } = options;
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    const uploadButton = (
        <div>
            {/*{loading ? <LoadingOutlined /> : <PlusOutlined />}*/}
            {<PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={EmployeeValidationSchema}
            enableReinitialize
        >
            {({ values, handleChange, setFieldValue }) => (
                <Form>
                    <Row justify="center">
                        <div data-testid={'employee-form'}>
                            <Row justify="center">
                                <Col>
                                    <Upload
                                        onChange={(file) => setFieldValue('profile_picture', file.file)}
                                        name="profile_picture"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        customRequest={dummyRequest}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {initialValues?.profile_picture ? (
                                            <img
                                                src={initialValues?.profile_picture}
                                                alt="avatar"
                                                style={{ width: '100%' }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>
                                </Col>
                            </Row>

                            <div style={{ marginTop: '10%' }}></div>

                            <TextInput label="Jméno" name="first_name" />

                            <TextInput label="Příjmení" name="last_name" />

                            <NumberInput label="Telefon" name="phone" />

                            <TextInput label="Email" name="email" />

                            <CategorySelectList name="working_category" label="Kategorizace práce" />

                            <DateSelector name="med_exam_date" label="Datum vstupní prohlídky" />

                            <DateSelector name="job_assign_date" label="Datum nástupu do práce" />

                            <TextArea
                                name="health_limitations"
                                label="Zdravotní omezení"
                                rows={3}
                                textareaSize="large"
                            />

                            <div style={{ marginTop: '10%' }}></div>

                            {initialValues?.first_name?.length > 1 ? (
                                <CustomSwitch label="Aktivní" name="active" />
                            ) : null}

                            {initialValues?.first_name?.length > 1 && companyStore.companies ? (
                                <div style={{ marginBottom: '10%' }}>
                                    <CompanySelectList
                                        companies={companyStore.companies}
                                        name="company"
                                        label="Firma"
                                    />
                                </div>
                            ) : null}

                            <Row justify="center">
                                <Dragger
                                    customRequest={dummyRequest}
                                    onChange={(file) => setFieldValue('attachment', file.file)}
                                    name="attachment"
                                    maxCount={1}
                                    accept=".pdf"
                                    defaultFileList={[
                                        {
                                            uid: '',
                                            url: initialValues?.attachment,
                                            name: 'test',
                                        },
                                    ]}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Klikněte nebo přetáhněte soubor ze počítače</p>
                                    <p className="ant-upload-hint">
                                        Zde můžete nahrát například pracovní smlouvy, lékařské zprávy atd.
                                    </p>
                                    <p className="ant-upload-hint">Pouze pro dokumenty formátu PDF</p>
                                </Dragger>
                            </Row>

                            <Col span={12} offset={9} style={{ marginTop: '3vh' }}>
                                <Button type="primary" htmlType="submit" data-testid="submit-button">
                                    Submit
                                </Button>
                            </Col>
                        </div>
                    </Row>
                </Form>
            )}
        </Formik>
    );
});
