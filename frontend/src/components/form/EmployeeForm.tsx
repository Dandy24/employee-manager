import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { EmployeeDto } from '../../models/dtos/employee-dto';
import * as yup from 'yup';
import { EmployeeEntity } from '../../models/entities/employee-entity';
import { Alert, Button, Col, Row, Upload } from 'antd';
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
import { toBase64 } from '../../utils/file-to-base64';

export interface EmployeeFormProps {
    initialValues: EmployeeDto | EmployeeEntity;
    onSubmit: (values: EmployeeDto) => void;
}

export const SUPPORTED_ATTACHMENT_FORMATS = ['application/pdf'];
export const SUPPORTED_PICTURE_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];

export const EmployeeValidationSchema = yup.object({
    first_name: yup.string().required('Pole musí být vyplněné').min(3, 'Jméno je příliš krátké'),
    last_name: yup.string().required('Pole musí být vyplněné').min(3, 'Příjmení je příliš krátké'),
    phone: yup
        .string()
        .typeError('Špatný formát čísla')
        .required('Pole musí být vyplněno')
        .matches(/^[0-9]+$/, 'Povoleny jsou pouze číslice')
        .min(12, 'Číslo musí mít přesně 12 číslic')
        .max(12, 'Číslo musí mít přesně 12 číslic'),
    email: yup.string().email('Neplatný formát emailu'),
    working_category: yup.string().required('Kategorie musí být vyplněna'),
    med_exam_date: yup.date(),
    job_assign_date: yup.date(),
    health_limitations: yup.string().max(100, 'Překročena maximální délka poznámky'),
    attachment: yup
        .mixed()
        .test('fileType', 'Podporován je pouze formát PDF', (value) =>
            !value || value?.status === 'removed' || typeof value === 'string'
                ? true
                : SUPPORTED_ATTACHMENT_FORMATS.includes(value?.type),
        ),
    profile_picture: yup
        .mixed()
        .test('fileType', 'Podporovány jsou pouze obrázky', (value) =>
            !value || value?.status === 'removed' || typeof value === 'string'
                ? true
                : SUPPORTED_PICTURE_FORMATS.includes(value?.type),
        ),
});

export const EmployeeForm: React.FC<EmployeeFormProps> = observer((props: EmployeeFormProps): JSX.Element => {
    const { initialValues, onSubmit } = props;

    const rootStore = useRootStore();

    const [profile_pic, setProfile_pic] = useState(null);

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
            <div style={{ marginTop: 8 }}>Nahrát fotku</div>
        </div>
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={EmployeeValidationSchema}
            enableReinitialize
        >
            {({ setFieldValue, errors, values, submitCount, isValid }) => (
                <Form style={{ width: '80%', marginLeft: '9%' }} data-testid="employee-form-form">
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
                        <div data-testid={'employee-form'}>
                            <Row justify="center">
                                <Col data-testid={'profile-picture'}>
                                    <Upload
                                        data-testid={'profile-picture-input'}
                                        onChange={(file) => setFieldValue('profile_picture', file.file)}
                                        name="profile_picture"
                                        listType="picture-card"
                                        className={`avatar-uploader ${
                                            initialValues?.profile_picture ? 'profile_picture' : 'profile_picture-empty'
                                        }`}
                                        showUploadList={false}
                                        customRequest={dummyRequest}
                                        beforeUpload={async (file) => setProfile_pic(await toBase64(file))}
                                        accept=".png,.jpg,.jpeg"
                                        style={{ height: '100%', textAlign: 'center' }}
                                    >
                                        {values?.profile_picture && typeof values?.profile_picture === 'string' ? (
                                            <img
                                                data-testid={'profile-picture'}
                                                src={initialValues?.profile_picture}
                                                alt="avatar"
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        ) : profile_pic ? (
                                            <img
                                                data-testid={'profile-picture'}
                                                src={profile_pic}
                                                alt="avatar"
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>
                                    {errors.profile_picture && values.profile_picture ? (
                                        <Alert
                                            style={{ width: '98%', marginTop: '5%' }}
                                            message={errors.profile_picture}
                                            type="error"
                                            showIcon
                                            data-testid="profile_picture-input-error"
                                        />
                                    ) : null}
                                </Col>
                            </Row>

                            <div style={{ marginTop: '4.5%' }}></div>

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

                            <Row justify="center" data-testid={'attachments-dropzone'}>
                                <Dragger
                                    customRequest={dummyRequest}
                                    onChange={(file) => setFieldValue('attachment', file.file)}
                                    name="attachment"
                                    maxCount={1}
                                    accept=".pdf"
                                    data-testid={'attachments-dropzone-input'}
                                    onRemove={() => {
                                        setFieldValue('attachment', null);
                                        initialValues.attachment = null;
                                        values.attachment = null;
                                    }}
                                    fileList={
                                        initialValues?.attachment
                                            ? [
                                                  {
                                                      uid: '',
                                                      url: initialValues?.attachment,
                                                      name: 'attachment',
                                                  },
                                              ]
                                            : values?.attachment?.name && values?.attachment?.originFileObj
                                            ? [
                                                  {
                                                      uid: '',
                                                      url: '',
                                                      name: values?.attachment?.name,
                                                  },
                                              ]
                                            : null
                                    }
                                    style={{ width: '100%' }}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Klikněte do vyznačené zóny nebo přetáhněte soubor z počítače pro jeho nahrání
                                    </p>
                                    <p className="ant-upload-hint">
                                        Zde můžete nahrát například pracovní smlouvy, lékařské zprávy atd.
                                    </p>
                                    <p className="ant-upload-hint">Pouze pro dokumenty formátu PDF</p>
                                </Dragger>
                                {errors.attachment && values.attachment ? (
                                    <Alert
                                        style={{ width: '98%', marginTop: '5%' }}
                                        message={errors.attachment}
                                        type="error"
                                        showIcon
                                        data-testid="attachment-input-error"
                                    />
                                ) : null}
                            </Row>

                            <Col span={12} offset={9} style={{ marginTop: '3vh' }}>
                                <Button type="primary" htmlType="submit" data-testid="submit-button">
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
