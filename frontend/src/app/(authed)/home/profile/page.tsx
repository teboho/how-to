"use client";

import { useAuthState } from "@/providers/authProvider";
import { useProfileActions, useProfileState } from "@/providers/profileProvider";
import { IProfile } from "@/providers/profileProvider/context";
import { useStoredFileActions, useStoredFileState } from "@/providers/storedFileProvider";
import { UploadOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Button, Form, FormProps, Input, message, Typography, Upload } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Guid } from "typescript-guid";
import useStyles from "./style";

const { Title } = Typography;

type FieldType = IProfile;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]; // the 0th prop param represents a file

const Page = (): React.ReactNode => {
    const { loginObj } = useAuthState();
    const { postProfile } = useProfileActions();
    const { profile } = useProfileState();
    const { uploadProfilePicture } = useStoredFileActions();
    const { storedFile, isSuccess } = useStoredFileState();
    const { styles, cx } = useStyles();
    const [messageApi, contextHolder] = message.useMessage();
    const [file, setFile] = useState<UploadFile>();
    const [uploading, setUploading] = useState<boolean>(false);

    useEffect(() => {
        if (loginObj && loginObj?.userId) {
            // getMyProfile();
        }
    }, []);

    const identityNo = useMemo(() => { 
        console.log('profile', profile);
        return profile?.identityNo
    }, [profile]);
    
    const handleUpload = () => {
        const formData = new FormData();
        if (!file) {
            messageApi.error('Please select a file to upload.');
            return;
        }
        formData.append("file", file as FileType);
        setUploading(true);

        uploadProfilePicture(formData)
            .then(() => {
                setFile(undefined);
                messageApi.success("Profile Picture uploaded successfuly.");
            }).then(() => {
                if (isSuccess && profile && storedFile?.id) {
                    // const newProfile = profile;
                    // newProfile.storedFileId = storedFile.id;
                    // postProfile(newProfile);
                }
            })
            .catch(() => messageApi.error("Profile picture upload unsuccessfull."))
            .finally(() => setUploading(false));
    }

    const uploadProps: UploadProps = {
        onRemove: () => {
            setFile(undefined); // set the latest list without the removed file
        },
        beforeUpload: (file) => {
            setFile(file); // save the file in  in the state
            return false;
        },
        fileList: file ? [file] : []
    }
    
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        values.creatorUserId = loginObj?.userId;
        console.log('Success:', values);
        if (profile) {
            values.id = profile.id;
            postProfile(values);
            return;
        }
        postProfile(values);
      }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    const imageUrlPre = process.env.NEXT_PUBLIC_API_IMAGE_URL_PRE;
    const showPicture = (id: string) => <img className={styles['profile-pic']} alt="profile-pic" src={`${imageUrlPre}${id}`} />;

    return (
        <section>
            {contextHolder}
            <Title level={2}>Profile</Title>  
            {profile && profile.storedFileId && !Guid.parse(profile.storedFileId).isEmpty() && showPicture(profile.storedFileId)}
            <article>
                <Upload
                    {...uploadProps}
                >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={!file}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Uploading'}
                </Button>
            </article>


            <Form
                name="login form"
                layout="vertical"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
                className={cx(styles.form)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{...profile, identityNo }}
            >
                <Form.Item<FieldType>
                    label="Identity No"
                    name="identityNo"
                    rules={[{ required: true, message: 'Please input a valid identity number!', pattern: /^[0-9]{13}$/, max: 13 }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        </section>
    );
};

export default Page;