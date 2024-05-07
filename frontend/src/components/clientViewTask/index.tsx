'use client';
import { IOffer, OfferStatus } from "@/providers/offerProvider/context";
import { useReviewActions } from "@/providers/reviewProvider";
import { IReview } from "@/providers/reviewProvider/context";
import { useTaskActions } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context";
import { FrownOutlined, MehOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons';
import { Form as AntdForm, Button, Divider, FormProps, GetProp, Input, InputNumber, Layout, message, Rate, Table, Typography, Upload, UploadFile, UploadProps } from "antd";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import useStyles from "./style";
import { useSupportingFileActions, useSupportingFileState } from "@/providers/supportingFileProvider";
import { useStoredFileActions, useStoredFileState } from "@/providers/storedFileProvider";
import { useAuthState } from "@/providers/authProvider";

const { Title } = Typography;
const { Sider } = Layout;


type FieldType = ITask;
type ReviewFieldType = IReview;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]; // the 0th prop param represents a file

const desc = ['terrible', 'bad', 'mhh', 'good', 'wonderful'];
const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};

const ClientViewTask = ({
    task, goPay, offers
}: {
    task?: ITask;
    goPay: (offerId: string, execId: number) => void;
    offers?: IOffer[];
}) => {
    const { styles, cx } = useStyles();
    const { loginObj } = useAuthState();
    const { completeTask, putTask } = useTaskActions();
    const { upload, getByTaskId } = useSupportingFileActions();
    const { supportingFiles } = useSupportingFileState();
    const { getStoredFiles, getLocal } = useStoredFileActions();
    const { storedFiles } = useStoredFileState();
    const { postReview } = useReviewActions();
    const [file, setFile] = useState<UploadFile>();
    const [messageApi, contextHolder] = message.useMessage();
    const [uploading, setUploading] = useState<boolean>(false);

    const _taskId = task?.id || "";

    useEffect(() => {
        if (loginObj) {
            getByTaskId(_taskId);
        }
        if (!storedFiles || storedFiles?.length) {
            getStoredFiles();
        }
    }, []);

    useEffect(() => {
        console.log(supportingFiles);
    }, [_taskId]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        if (_taskId) {
            putTask(values);
        }
    }

    const acceptFinish: FormProps<IOffer>['onFinish'] = (values) => {
        console.log('Accept Success:', values);
        if (task?.status === 0) {
            values.status = 1;
            if (values.id && values.creatorUserId && _taskId && values.creatorUserId) {
                goPay(values.id, values.creatorUserId);
            }
        }
        else if (task?.status === 1) {
            console.log('Completing:', task);
            if (task.id) {
                completeTask(task.id);
            }
        }
    }

    const columns = [
        {
            title: 'Executor',
            dataIndex: 'creatorUserId',
            key: 'creatorUserId',
        },
        {
            title: 'Amount',
            dataIndex: 'counterAmount',
            key: 'counterAmount',
            render: (_amount: number) => <span>R {_amount}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_status: number) => <span>{_status === 0 ? OfferStatus.NEW : OfferStatus.Accepted}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: IOffer) => (
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        id: record.id,
                        creatorUserId: record.creatorUserId,
                        counterAmount: record.counterAmount,
                        status: record.status,
                        taskId: record.taskId
                    }}
                    onSubmit={acceptFinish}
                >
                    <Form>
                        {record.status === 0 && (task?.status || 0) < 2 &&
                            <Button type="primary" htmlType="submit">Accept</Button>
                        }
                        {record.status === 1 && task && task.status < 2 &&
                            <Button type="primary" htmlType="submit">Confirm Completion</Button>
                        }
                    </Form>
                </Formik>
            )
        }
    ];

    const supportingFileUploadProps: UploadProps = {
        onRemove: () => {
            setFile(undefined);
        },
        beforeUpload: (file) => {
            setFile(file);
            return false;
        },
        fileList: file ? [file] : []
    }

    const handleUpload = () => {
        const formData = new FormData();
        if (!file) {
            messageApi.error('Please select a file to upload.');
            return;
        }
        formData.append("file", file as FileType);
        formData.append("taskId", _taskId || "");
        setUploading(true);

        upload(formData)
            .then(() => {
                setFile(undefined);
                messageApi.success("Profile Picture uploaded successfuly.");
            })
            .catch(() => messageApi.error("Profile picture upload unsuccessfull."))
            .finally(() => setUploading(false));
    }
    const storedFileBaseUrl = process.env.NEXT_PUBLIC_API_IMAGE_URL_PRE || "";
    return (
        <div>
            {contextHolder}
            <Title level={2}>View Task</Title>
            <Layout style={{ background: "#E5E3D2" }} className={cx(styles.layout)}>
                <Sider theme="light" className={cx(styles.sider)} width={"65%"}>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            title: task?.title || "",
                            description: task?.description || "",
                            amount: task?.amount || 0,
                            timeFrame: task?.timeFrame || 0,
                            status: task?.status || 0,
                            id: task?.id || "",
                        }}
                        onSubmit={onFinish}
                        disabled={task && task?.status > 1}
                    >
                        <Form>
                            <AntdForm.Item label="Title">
                                <Field name="title" type="text" as={Input} />
                            </AntdForm.Item>
                            <AntdForm.Item label="Description">
                                <Field name="description" type="text" as={Input.TextArea} />
                            </AntdForm.Item>
                            <AntdForm.Item label="Amount">
                                <Field name="amount" type="number" as={InputNumber} />
                            </AntdForm.Item>
                            <AntdForm.Item label="Time Frame">
                                <Field name="timeFrame" type="number" as={InputNumber} />
                            </AntdForm.Item>
                            <AntdForm.Item>
                                <Button type="primary" htmlType="submit">Update</Button>
                            </AntdForm.Item>
                        </Form>
                    </Formik>
                </Sider>
                <Sider theme="light" width={"34%"} className={cx(styles.sider)} >
                    {task && task?.status < 2 && (
                        <div>
                            <Title level={3}>Supporting Files</Title>
                            <div>
                                {supportingFiles && supportingFiles.map((file, index) => (
                                    <div key={`file_${index}`}>
                                        <a href={`${storedFileBaseUrl}${file.id}`} target="_blank" rel="noreferrer">File {index}</a>
                                    </div>
                                ))}
                            </div>
                            <Divider>Upload More Supporting Files</Divider>
                            <Upload
                                {...supportingFileUploadProps}
                            >
                                <p>To give the executor more context</p>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>
                            {file && (<Button type="primary" onClick={handleUpload} loading={uploading}>Upload</Button>)}
                        </div>
                    )}
                    <Divider>Review & Rate</Divider>
                    {task && task?.status > 1 && (
                        <Formik
                            initialValues={{
                                rating: 0,
                                content: "",
                                taskId: ""
                            }}
                            onSubmit={values => {
                                console.log(values);
                                if (!values?.rating || !values.content) {
                                    alert("You must fill both the rating and the review!");
                                    return;
                                }
                                values.taskId = _taskId || "";
                                const review: IReview = values;
                                review.taskId = _taskId || "";
                                postReview(review)
                            }}
                        >
                            <Form
                            >
                                <AntdForm.Item label="Rating: ">
                                    <Field name="rating" type="number" as={() => (
                                        <Rate id="rating" tooltips={desc} style={{ color: "green" }} character={({ index = 0 }) => customIcons[index + 1]} />
                                    )} />
                                </AntdForm.Item>
                                <Field name="content" type="text" as={Input.TextArea} />
                                <Button htmlType="submit" >Complete Rating</Button>
                            </Form>
                        </Formik>
                    )}
                </Sider>
            </Layout>
            <Title level={3}>Task Offers</Title>
            <Table dataSource={offers} columns={columns} className={cx(styles["box-shadow"])} />
        </div >
    );
}

export default ClientViewTask;