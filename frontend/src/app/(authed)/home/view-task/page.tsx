"use client";

import { useTaskActions, useTaskState } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context";
import { Button, ConfigProvider, Form, FormProps, Input, InputNumber, Typography } from "antd";
import useStyles from "./style";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "@/providers/authProvider";
import { AbpTokenProperies } from "@/utils";

const { Title } = Typography;

type FieldType = ITask;

const Page = () => {
    const { getTask } = useTaskActions();
    const { task } = useTaskState();
    const { decodedToken } = useAuthState();
    const { styles, cx, theme } = useStyles();
    const params = new URLSearchParams(useSearchParams());

    const id = params.get("id");

    useEffect(() => {
        if (typeof id === "string") {
            getTask(id);
        }
    }, []);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        values.status = 0;
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const onExecutorFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        alert(JSON.stringify(values));
    }
    
    const clientViewTask = () => (
        <>
            <Title level={2}>View Task</Title>
            <Form
                name="new-task"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                initialValues={{
                    title: task?.title,
                    description: task?.description,
                    amount: task?.amount,
                    timeFrame: task?.timeFrame
                }}
                className={cx(styles.form)}
            >
                <Form.Item<FieldType>
                    label="Ttitle"
                    name="title"
                    rules={[{ required: true, message: 'Please input the task title!' }]}
                >
                    <Input />   
                </Form.Item>
                <Form.Item<FieldType>
                    label="Task Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the task description!' }]} 
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Task Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Please input the task amount!' }]}
                >
                    <InputNumber prefix="R"  />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Task Time Frame"
                    name="timeFrame"
                    help="The time frame is in hours"
                    rules={[{ required: true, message: 'Please input the task timeframe!' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBgContainer: "#fff",
                                colorPrimaryActive: "#B64326",
                                colorBgTextActive: "#B64326"
                            }        
                        }}
                    >
                        <Button type="primary" htmlType="submit">Update</Button>
                    </ConfigProvider>
                </Form.Item>                
            </Form>
            <Title level={3}>Task Offers</Title>
            {/* cards for each offer */}
        </>
    );

    // executor wont be able to edit the task, except they will have a small form to submit their offer below the task details
    const executorViewTask = () => (
        <section className={cx(styles.border)}>
            <article className={cx(styles.border)}>
                <Title level={2}>View Task</Title>
                <Title level={3}>Description</Title>
                <p>{task?.description}</p>
                <Title level={3}>Amount</Title>
                <p>{task?.amount}</p>
                <Title level={3}>Time Frame</Title>
                <p>{task?.timeFrame}</p>
            </article>
            <hr />
            <Title level={3}>Alternative Offer</Title>
            <Form
                name="new-offer"
                onFinish={onExecutorFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                initialValues={{
                    amount: task?.amount
                }}
                className={cx(styles.form)}
            >
                <Form.Item<FieldType>
                    label="Offer Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Please input the offer amount!' }]}
                >
                    <InputNumber prefix="R"  />
                </Form.Item>
                <Form.Item>
                    <ConfigProvider
                        theme={theme}
                    >
                        <Button type="primary" htmlType="submit">Submit Offer</Button>
                    </ConfigProvider>
                </Form.Item>
            </Form>
        </section>
    );
    const supportViewTask = () => (
        <>
            <Title level={2}>View Task</Title>
            <Title level={3}>Description</Title>
            <p>{task?.description}</p>
            <Title level={3}>Amount</Title>
            <p>{task?.amount}</p>
            <Title level={3}>Time Frame</Title>
            <p>{task?.timeFrame}</p>
        </>
    );

    const roleKey = AbpTokenProperies.role;
    const role = decodedToken ? `${decodedToken[roleKey]}` : "";
    switch (role.toLocaleLowerCase()) {
        case "support":
            return supportViewTask();
        case "executor":
            return executorViewTask();
        case "client":
        default:
            return clientViewTask();
    }
}

export default Page;