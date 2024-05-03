"use client";
import Portfolios from "@/components/portfolios";
import { useAuthState } from "@/providers/authProvider";
import { useCategoriesState, useCategoryActions } from "@/providers/categoryProvider";
import { usePortfolioActions, usePortfolioState } from "@/providers/portfolioProvider";
import { useProfileActions, useProfileState } from "@/providers/profileProvider";
import { IProfile } from "@/providers/profileProvider/context";
import { useStoredFileActions } from "@/providers/storedFileProvider";
import { UploadOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Button, Divider, Flex, FormProps, message, Typography, Upload, Form as AntdForm, Select, Tag } from "antd";
import { Field, Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { Guid } from "typescript-guid";
import useStyles from "./style";
import { IExecutorCategory } from "@/providers/categoryProvider/context";

const { Title } = Typography;

type FieldType = IProfile;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]; // the 0th prop param represents a file

const Page = (): React.ReactNode => {
    const { loginObj } = useAuthState();
    const { postProfile, getMyProfile } = useProfileActions();
    const { profile } = useProfileState();
    const { uploadProfilePicture } = useStoredFileActions();
    const { isSuccess: portfolioSuccess, portfoliosWithStoredFiles } = usePortfolioState();
    const { upload, getMyPortfolio } = usePortfolioActions();
    const { categories, myExecutorCategories } = useCategoriesState();
    const { postMyCategories, getMyCategories, deleteExecutorCategory } = useCategoryActions();

    const { styles, cx } = useStyles();
    const [messageApi, contextHolder] = message.useMessage();
    const [file, setFile] = useState<UploadFile>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [listUploading, setListUploading] = useState<boolean>(false);

    useEffect(() => {
        if (loginObj) {
            getMyPortfolio();
            getMyCategories();
            if (!profile) {
                getMyProfile();
            }
        }
    }, []);
    useEffect(() => {
        if (loginObj) {
            getMyPortfolio();
            getMyCategories();
            if (!profile) {
                getMyProfile();
            }
        }
    }, [loginObj]);

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
            })
            .catch(() => messageApi.error("Profile picture upload unsuccessfull."))
            .finally(() => setUploading(false));
    }

    const handlePortfolioUpload = () => {
        const formData = new FormData();
        if (fileList.length === 0) {
            messageApi.error('Please select a file to upload.');
            return;
        }
        fileList.forEach(
            file => {
                formData.append('Files', file as FileType)

                console.log("--", file?.name)
            }
        );
        setListUploading(true);

        upload(formData)
            .then(() => {
                setFileList([]);
                messageApi.success("Portfolio uploaded successfuly.");
            })
            .catch(() => messageApi.error("Portfolio upload unsuccessfull."))
            .finally(() => setListUploading(false));
    }

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

    const portfolioUploadProps: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList(_fileList => [..._fileList, file]);
            console.log("--", fileList)
            return false;
        },
        fileList: fileList
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

    const isSelected = (categoryId: string) => {
        return myExecutorCategories?.findIndex((ec) => ec.categoryId === categoryId) !== -1;
    }

    const readCategory = (categoryId: string) => {
        return categories?.find((category) => category.id === categoryId);
    }

    return (
        <section
            className="page"
        >
            {contextHolder}
            <Title level={2}>Profile</Title>
            <Flex gap={100}>
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
                            onClick={handleUpload}
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
                            identityNo: profile && profile.identityNo || ""
                        }}
                        onSubmit={onFinish}
                    >
                        <Form
                            className={cx(styles.form)}
                        >
                            <label htmlFor="govId" className={styles.label}>Government Identity Number</label>
                            <Field id="govId" className={styles["text-input"]} name="identityNo" type="text" />
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Form>
                    </Formik>
                    <Divider>Categories</Divider>
                    <div>
                        {myExecutorCategories?.map((ec, i) => (
                            <Tag key={i} closable onClose={
                                () => {
                                    deleteExecutorCategory(ec.id || "");
                                }
                            }>
                                {readCategory(ec.categoryId)?.title}
                            </Tag>
                        ))}
                    </div>
                    <Formik
                        initialValues={{
                            executorCategory: [
                                ...categories?.filter((category) => isSelected(category.id || "")).map((category) => category.id) || []
                            ]
                        }}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ setFieldValue }) => (
                            <AntdForm title="select-category" onFinish={(values) => {
                                console.log("onFinish")
                                const _categories: IExecutorCategory[] = values.executorCategory.map((categoryId: string) => {
                                    return {
                                        executorId: profile?.id || "",
                                        categoryId: categoryId
                                    }
                                });
                                console.log(_categories);
                                postMyCategories({
                                    executorCategories: _categories
                                });
                                setFieldValue('executorCategory', []);
                            }}>
                                <AntdForm.Item name="executorCategory">
                                    <Select
                                        onChange={(value) => setFieldValue('executorCategory', value)}
                                        mode="multiple"
                                        options={categories?.map((category, i) => ({
                                            label: `${i + 1}. ${category.title}`,
                                            value: category.id,
                                            disabled: isSelected(category.id || "")
                                        }))}
                                    >
                                    </Select>
                                </AntdForm.Item>
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </AntdForm>
                        )}
                    </Formik>
                </div>
                <article
                    className={cx(styles["demo-container"])}
                >
                    <Title level={3}>Portfolio</Title>
                    <Upload
                        {...portfolioUploadProps}
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    <Button
                        type="primary"
                        onClick={handlePortfolioUpload}
                        disabled={fileList.length === 0}
                        loading={listUploading}
                        style={{ marginTop: 16 }}
                    >
                        {uploading ? 'Uploading Portfolio' : 'Start Uploading'}
                    </Button>
                    <Divider>Demo Files</Divider>
                    <Title level={4}>Images</Title>
                    <Portfolios props={{ portfoliosWithStoredFiles }} />
                </article>
            </Flex>
        </section>
    );
};

export default Page;