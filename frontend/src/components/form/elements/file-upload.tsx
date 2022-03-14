import { observer } from 'mobx-react-lite';
import { Alert } from 'antd';
import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { FormikErrors } from 'formik';
import Dragger from 'antd/lib/upload/Dragger';
import { UploadFile } from 'antd/lib/upload/interface';

export interface FileUploadProps {
    initialValue?: string | null;
    value: UploadFile | null;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    name: string;
    acceptedTypes?: string;
    onClear1: () => void;
    onClear2: () => void;
    hintText1: string;
    hintText2?: string;
}

export const FileUpload: React.FC<FileUploadProps> = observer((props: FileUploadProps) => {
    const { error, setFieldValue, name, acceptedTypes, initialValue, value, onClear2, onClear1, hintText1, hintText2 } =
        props;

    const dummyRequest = (options) => {
        const { onSuccess } = options;
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    return (
        <>
            <Dragger
                customRequest={dummyRequest}
                onChange={(file) => setFieldValue(name, file.file)}
                name={name}
                maxCount={1}
                accept={acceptedTypes ? acceptedTypes : '.pdf'}
                data-testid={`${name}-dropzone-input`}
                onRemove={() => {
                    setFieldValue(name, null);
                    onClear1();
                    onClear2();
                }}
                fileList={
                    initialValue
                        ? [
                              {
                                  uid: '',
                                  url: initialValue,
                                  name: name,
                              },
                          ]
                        : value?.name && value.originFileObj
                        ? [
                              {
                                  uid: '',
                                  url: '',
                                  name: value?.name,
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
                <p className="ant-upload-hint">{hintText1}</p>
                <p className="ant-upload-hint">{hintText2}</p>
            </Dragger>
            {error && value ? (
                <Alert
                    style={{ width: '98%', marginTop: '5%' }}
                    message={error}
                    type="error"
                    showIcon
                    data-testid={`${name}-input-error`}
                />
            ) : null}
        </>
    );
});
