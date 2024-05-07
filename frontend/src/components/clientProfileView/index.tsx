"use client";
import { useAuthState } from "@/providers/authProvider";
import { useCategoriesState, useCategoryActions } from "@/providers/categoryProvider";
import { usePortfolioActions, usePortfolioState } from "@/providers/portfolioProvider";
import { useProfileActions, useProfileState } from "@/providers/profileProvider";
import { IProfile } from "@/providers/profileProvider/context";
import { useStoredFileActions } from "@/providers/storedFileProvider";
import { UploadOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Button, Flex, FormProps, Input, message, Typography, Upload } from "antd";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Guid } from "typescript-guid";
import useStyles from "./style";

const { Title } = Typography;
const { TextArea } = Input;
type FieldType = IProfile;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]; // the 0th prop param represents a file

const ClientProfileView = () => {
    const { loginObj } = useAuthState();
    const { postProfile, getMyProfile } = useProfileActions();
    const { profile } = useProfileState();
    const { uploadProfilePicture } = useStoredFileActions();

    const { styles, cx } = useStyles();
    const [messageApi, contextHolder] = message.useMessage();
    const [file, setFile] = useState<UploadFile>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [listUploading, setListUploading] = useState<boolean>(false);

    const profilePicUploadProps: UploadProps = {
        onRemove: () => {
            setFile(undefined);
        },
        beforeUpload: (file) => {
            setFile(file);
            return false;
        },
        fileList: file ? [file] : []
    }

    const handleProfilePicUpload = () => {
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
            })
            .then(() => getMyProfile())
            .catch(() => messageApi.error("Profile picture upload unsuccessfull."))
            .finally(() => setUploading(false));
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

    const imageUrlPre = process.env.NEXT_PUBLIC_API_IMAGE_URL_PRE;
    const showPicture = (id: string) => <img className={styles['profile-pic']} alt="profile-pic" src={`${imageUrlPre}${id}`} />;

    return (
        <Flex align="center" justify="center">
            <div>
                {profile && profile.storedFileId && !Guid.parse(profile.storedFileId).isEmpty() && showPicture(profile.storedFileId)}
                <article
                    className={cx(styles.form)}
                >
                    <Title level={3}>Profile Picture</Title>
                    <Upload
                        {...profilePicUploadProps}
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    <Button
                        type="primary"
                        onClick={handleProfilePicUpload}
                        disabled={!file}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                    >
                        {uploading ? 'Uploading' : 'Start Uploading'}
                    </Button>
                </article>

                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        identityNo: profile && profile.identityNo || "",
                        username: profile && profile.username || "",
                        bio: profile && profile.bio || ""
                    }}
                    onSubmit={onFinish}
                >
                    <Form
                        className={cx(styles.form)}
                    >
                        <label htmlFor="govId" className={styles.label}>Government Identity Number</label>
                        <Field id="govId" className={styles["text-input"]} name="identityNo" type="text" />
                        <br />
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <Field id="username" className={styles["text-input"]} name="username" type="text" />
                        <br />
                        <label htmlFor="bio" className={styles.label}>Bio</label>
                        <Field id="bio" as={TextArea} className={styles["text-input"]} name="bio" type="text" />
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form>
                </Formik>
            </div>
        </Flex>
    );
}

export default ClientProfileView;