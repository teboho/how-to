"use client";
import ClientProfileView from "@/components/clientProfileView";
import Portfolios from "@/components/portfolios";
import { useAuthState } from "@/providers/authProvider";
import { useCategoriesState, useCategoryActions } from "@/providers/categoryProvider";
import { usePortfolioActions, usePortfolioState } from "@/providers/portfolioProvider";
import { useProfileActions, useProfileState } from "@/providers/profileProvider";
import { IProfile } from "@/providers/profileProvider/context";
import { useStoredFileActions } from "@/providers/storedFileProvider";
import { AbpTokenProperies } from "@/utils";
import { UploadOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Button, Divider, Flex, Input, message, Select, Tag, Typography, Upload, Form as AntdForm } from "antd";
import { useEffect, useMemo, useState } from "react";
import useStyles from "./style";
import { Formik } from "formik";
import { IExecutorCategory } from "@/providers/categoryProvider/context";

const { Title } = Typography;
const { TextArea } = Input;
type FieldType = IProfile;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]; // the 0th prop param represents a file

const Page = (): React.ReactNode => {
    const { loginObj, decodedToken } = useAuthState();
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
            .catch(() => messageApi.error("Portfolio upload unsuccessfull."))
            .finally(() => setListUploading(false));
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

    let role = useMemo(() => {
        if (decodedToken) {
            return decodedToken[AbpTokenProperies.role].toLocaleLowerCase();
        }
        return "client";
    }, []);

    role = useMemo(() => {
        if (decodedToken) {
            return decodedToken[AbpTokenProperies.role].toLocaleLowerCase();
        }
        return "client";
    }, [decodedToken]);

    if (role !== "executor") {
        return <ClientProfileView />;
    }

    const readCategory = (categoryId: string) => {
        return categories?.find((category) => category.id === categoryId);
    }
    const isSelected = (categoryId: string) => {
        return myExecutorCategories?.findIndex((ec) => ec.categoryId === categoryId) !== -1;
    }

    return (
        <section
            className="page"
        >
            {contextHolder}
            <Title level={2}>Profile</Title>
            <Flex gap={100}>
                <div>
                    <ClientProfileView />
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