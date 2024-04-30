"use client";

import { useAuthState } from "@/providers/authProvider";
import { useTaskActions, useTaskState } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context";
import { EyeOutlined } from '@ant-design/icons';
import { Segmented, Space, Table, Typography } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import Loading from "./loading";
import useStyles from "./style";

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
    const { loginObj } = useAuthState();
    const { tasks, isPending } = useTaskState();
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
            // render a partial description
            render: (text: any) => {
                return text.length > 100 ? text.slice(0, 100) + "..." : text;
            }
        },
        { 
            title: 'Amount (ZAR per hour)',
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
            render: (text: number) => {
                switch (text) {
                    case 0:
                        return "New";
                    case 1:
                        return "Assigned";
                    case 2:
                        return "Done";
                }
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
    
    const rows = tasks?.map((task: ITask) => {
        return {
            key: `task_${task.id}`,
            id: task.id,
            title: task.title,
            description: task.description,
            amount: task.amount,
            views: task.views,
            timeFrame: task.timeFrame,
            status: task.status,
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
                {rows && <Table columns={columns} dataSource={rows} />}
                {isPending ? <Loading /> : null }
            </section>
        </section>
    );
}

export default Page;