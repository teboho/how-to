"use client";

import { useTaskActions, useTaskState } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context";
import { Button, ConfigProvider, Form, FormProps, Input, InputNumber, Typography, Table } from "antd";
import useStyles from "./style";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useAuthState } from "@/providers/authProvider";
import { AbpTokenProperies } from "@/utils";
import { IOffer, OfferStatus } from "@/providers/offerProvider/context";
import { useOfferActions, useOfferState } from "@/providers/offerProvider";
import { render } from "@testing-library/react";

const { Title } = Typography;

type FieldType = ITask;

const Page = () => {
    const { getTask, completeTask, upViews } = useTaskActions();
    const { task } = useTaskState();
    const { decodedToken } = useAuthState();
    const { postOffer, getMyOffer, getTaskOffers, acceptOffer } = useOfferActions();
    const { offer, offers } = useOfferState();
    const { styles, cx } = useStyles();
    const params = new URLSearchParams(useSearchParams());
        
    const id = params.get("id");

    useEffect(() => {
        if (typeof id === "string") {
            getTask(id);
            getMyOffer(id);
            getTaskOffers(id);
        }
        if (role === "executor") {
            id && upViews(id);
        }
    }, []);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        values.status = 0;
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const onExecutorFinish: FormProps<IOffer>['onFinish'] = (values) => {
        console.log('Success:', values);
        if (id) {
            values.taskId = id;
            values.status = 0;
            postOffer(values);
        }
    }

    const acceptFinish: FormProps<IOffer>['onFinish'] = (values) => {
        console.log('Accept Success:', values);
        if (task?.status === 0) {
            values.status = 1;
            if (values.id) {
                acceptOffer(values.id);
            }
        }
        else if (task?.status === 1) {
            console.log('Completing:', task);
            if (task.id) {
                completeTask(task.id);
            }
        }
    }

    const acceptFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
                <Form preserve={true}
                    name="accept-offer"
                    onFinish={acceptFinish}
                    onFinishFailed={acceptFinishFailed}
                    layout="vertical"
                    initialValues={{
                        counterAmount: record.counterAmount
                    }}
                >
                    <Form.Item
                        name="id"
                        hidden
                        initialValue={record.id}
                    >
                        <Input />
                    </Form.Item>
                    {   record.status === 0 &&                     
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Accept</Button>
                        </Form.Item>
                    }
                    {
                        record.status === 1 && task && task.status < 2 &&
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Confirm Completion</Button>
                        </Form.Item>
                    }
                </Form>
            )
        }
    ];
    
    const clientViewTask = () => (
        <>
            <Title level={2}>View Task</Title>
            <Form preserve={true}
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
                disabled={task && task?.status > 1}
            >
                <Form.Item<FieldType>
                    label="Title"
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
            <Table dataSource={offers} columns={columns} />
        </>
    );

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
            {(!offer) && <Form
                preserve={true}
                name="new-offer"
                onFinish={onExecutorFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                initialValues={{
                    counterAmount: task?.amount
                }}
                className={cx(styles.form)}
            >
                <Form.Item<IOffer>
                    label="Offer Amount"
                    name="counterAmount"
                    rules={[{ required: true, message: 'Please input the offer amount!' }]}
                >
                    <InputNumber prefix="R"  />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit Offer</Button>
                </Form.Item>
            </Form>}
            {(offer) && (<>
                <Title level={3}>Your Offer</Title>
                <p>R {offer.counterAmount}</p>
                <p>Status: {offer.status === 0 ? OfferStatus.NEW : OfferStatus.Accepted}</p>
            </>)}
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