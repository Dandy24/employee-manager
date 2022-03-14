import { observer } from 'mobx-react-lite';
import { Alert, Upload } from 'antd';
import { toBase64 } from '../../../utils/file-to-base64';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { FormikErrors } from 'formik';

export interface ImageUploadProps {
    initialValue?: string | null;
    value: string | File | null;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    name: string;
    acceptedTypes?: string;
    profile_pic: string | null;
    setProfilePic: React.Dispatch<string | ArrayBuffer>;
}

export const ImageUpload: React.FC<ImageUploadProps> = observer((props: ImageUploadProps) => {
    const { initialValue, value, error, setFieldValue, name, acceptedTypes, setProfilePic, profile_pic } = props;

    const dummyRequest = (options) => {
        const { onSuccess } = options;
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Nahrát fotku</div>
        </div>
    );

    return (
        <>
            <Upload
                data-testid={`${name}-input`}
                onChange={(file) => setFieldValue(name, file.file)}
                name={name}
                listType="picture-card"
                className={`avatar-uploader ${initialValue ? 'profile_picture' : 'profile_picture-empty'}`}
                showUploadList={false}
                customRequest={dummyRequest}
                beforeUpload={async (file) => setProfilePic(await toBase64(file))}
                accept={acceptedTypes ? acceptedTypes : '.png,.jpg,.jpeg'}
                style={{ height: '100%', textAlign: 'center' }}
            >
                {value && typeof value === 'string' ? (
                    <img data-testid={name} src={initialValue} alt="avatar" style={{ width: '100%', height: '100%' }} />
                ) : profile_pic ? (
                    <img data-testid={name} src={profile_pic} alt="avatar" style={{ width: '100%', height: '100%' }} />
                ) : (
                    uploadButton
                )}
            </Upload>
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
