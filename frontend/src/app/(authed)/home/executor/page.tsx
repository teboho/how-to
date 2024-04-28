"use client";

import { useAuthState } from "@/providers/authProvider";
import { useTaskActions, useTaskState } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context";
import { Typography, Table, Segmented, Space } from "antd";
import { EyeOutlined } from '@ant-design/icons';
import { useEffect } from "react";
import useStyles from "./style";
import Link from "next/link";

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
    const { loginObj } = useAuthState();
    const { tasks } = useTaskState();
    const { getTasks } = useTaskActions();
    const { styles, cx } = useStyles();

    useEffect(() => {
        if (loginObj) {
            getTasks();
        }
    }, []);

    
    const columns = [
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
            title: 'Time Frame (hours)',
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
    
    const rows = tasks?.map((task: ITask) => {
        return {
            key: `task_${task.id}`,
            id: task.id,
            title: task.title,
            description: task.description,
            amount: `R ${task.amount}`,
            views: task.views,
            timeFrame: task.timeFrame,
            status: task.status === 0 ? "New" : task.status === 1 ? "Assigned" : "Done",
        }
    });
    
    return (
        <section>
            <section className={cx(styles.box)}>
                <Title level={3}>Money genereated so far</Title>
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