"use client";
import { useAuthState } from '@/providers/authProvider';
import { usePaymentActions, usePaymentState } from '@/providers/paymentProvider';
import { useTaskActions, useTaskState } from '@/providers/taskProvider';
import { ITask } from '@/providers/taskProvider/context';
import { EyeOutlined } from '@ant-design/icons';
import { Segmented, Space, Table, Typography } from 'antd';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Loading from './loading';
import useStyles from './style';

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
    const { styles, cx, theme } = useStyles();
    const { loginObj } = useAuthState();
    const { getMyTasks, getLocalTask } = useTaskActions();
    const { tasks, isPending, isSuccess: tasksSuccess } = useTaskState();
    const { getPayments } = usePaymentActions();
    const { payments, isSuccess: paymentsSuccess } = usePaymentState();
    const [table, setTable] = React.useState<string>('Tasks');

    useEffect(() => {
        if (loginObj) {
            getMyTasks();
            getPayments();
        }
    }, []);

    const task_columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            // render a partial description
            render: (text: any) => {
                return text.length > 50 ? text.slice(0, 50) + "..." : text;
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'key',
            render: (text: any) => {
                return `R ${text}`;
            }
        },
        {
            title: 'Views',
            dataIndex: 'views',
            key: 'views'
        },
        {
            title: 'Time Frame (hours)',
            dataIndex: 'timeFrame',
            key: 'timeFrame'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: any) => {
                return text === 0 ? "New" : text === 1 ? "Assigned" : "Done";
            }
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            render: (text: any, record: ITask) => (
                <Space size="middle">
                    <Link href={`view-task?id=${record.id}`}>
                        <EyeOutlined />
                        View
                    </Link>
                    {/* <a>Decline</a> */}
                </Space>
            )
        }
    ];

    const task_rows = tasks?.map((task: ITask) => {
        return {
            key: `task_${task.id}`,
            id: task.id,
            title: task.title,
            description: task.description,
            amount: task.amount,
            views: task.views,
            timeFrame: task.timeFrame,
            status: task.status
        }
    });

    const payment_columns = [
        {
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text: any) => {
                return `R ${text}`;
            }
        },
        {
            title: 'Transaction',
            dataIndex: 'transaction',
            key: 'transaction'
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank'
        },
        {
            title: 'Task ID',
            dataIndex: 'taskId',
            key: 'taskId',
            render: (text: any) => {
                return <Link href={`
                    view-task?id=${text}
                `}>
                    {getLocalTask(text)?.title}
                </Link>
            }
        }
    ];

    const payment_rows = payments?.map((payment: any) => {
        return {
            key: `payment_${payment.id}`,
            id: payment.id,
            reference: payment.reference,
            amount: payment.amount,
            transaction: payment.transaction,
            bank: payment.bank,
            taskId: payment.taskId
        }
    });

    return (
        <section>
            <section className={cx(styles.box)}>
                <Title level={2}>Welcome John Doe!</Title>
                <Title level={3}>Money Spent so far</Title>
                <Paragraph className={cx(styles["total-money"])}>R7 564.07</Paragraph>
            </section>
            <section className={cx(styles.box)}>
                <Segmented
                    className={cx(styles.segmented)}
                    defaultValue="Tasks"
                    style={{ marginBottom: 8 }}
                    onChange={(value) => setTable(value)}
                    options={['Tasks', 'Payments']}
                />
                {table === "Tasks" && tasksSuccess && <Table columns={task_columns} dataSource={task_rows} pagination={{ pageSize: 5 }} scroll={{ y: 240 }} />}
                {table === "Payments" && paymentsSuccess && <Table columns={payment_columns} dataSource={payment_rows} />}
                {isPending ? <Loading /> : null}
            </section>
        </section>
    );
}

export default Page;