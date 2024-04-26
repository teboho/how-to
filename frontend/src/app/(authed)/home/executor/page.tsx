"use client";

import { useAuthState } from "@/providers/authProvider";
import { useTaskActions, useTaskState } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context";
import { Typography, Table, Segmented } from "antd";
import { useEffect } from "react";
import useStyles from "./style";
import { columns } from "../client/page";

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