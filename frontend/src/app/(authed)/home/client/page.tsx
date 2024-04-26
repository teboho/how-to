"use client";

import { useAuthState } from '@/providers/authProvider';
import { useTaskActions, useTaskState } from '@/providers/taskProvider';
import { ITask } from '@/providers/taskProvider/context';
import { EyeOutlined } from '@ant-design/icons';
import { Segmented, Space, Table, Typography } from 'antd';
import Link from 'next/link';
import React, { useEffect } from 'react';
import 'react-data-grid/lib/styles.css';
import useStyles from './style';

const { Title, Paragraph } = Typography;

/**
 * Columns for the tasks table
 */
export const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    { 
        title: 'Amount',
        dataIndex: 'amount',
        key: 'key'
    },
    {
        title: 'Views',
        dataIndex: 'views',
        key: 'views'
    },
    {
        title: 'Time Frame',
        dataIndex: 'timeFrame',
        key: 'timeFrame'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: "Action",
        key: "action",
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

const Page = (): React.ReactNode => {
    const { styles, cx, theme } = useStyles();
    const { loginObj } = useAuthState();
    const { getMyTasks } = useTaskActions();
    const { tasks, isPending, isSuccess } = useTaskState();

    useEffect(() => {
        if (loginObj) {
            getMyTasks();
        }
    }, []);

    const rows = tasks?.map((task: ITask) => {
        return {
            key: `task_${task.id}`,
            id: task.id,
            title: task.title,
            description: task.description,
            amount: `R ${task.amount}`,
            views: task.views,
            timeFrame: task.timeFrame,
            status: task.status
        }
    });

    return (
        <section>
            <section className={cx(styles.box)}>
                <Title level={3}>Money Spent so far</Title>
                <Paragraph className={cx(styles["total-money"])}>R7 564.07</Paragraph>
            </section>
            <section className={cx(styles.box)}>                
                <Segmented
                    className={cx(styles.segmented)}
                    defaultValue="Tasks"
                    style={{ marginBottom: 8 }}
                    onChange={(value) => {value}}
                    options={['Tasks', 'Transactions']}
                />
                <Table columns={columns} dataSource={rows || []} />
            </section>
        </section>
    );
}

export default Page;