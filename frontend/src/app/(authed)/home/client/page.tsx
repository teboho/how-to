"use client";

import React from 'react';
import { useAuthState } from '@/providers/authProvider';
import { useTaskActions, useTaskState } from '@/providers/taskProvider';
import { getRole } from '@/utils';
import { Typography, Table, Segmented } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import DataGrid, { RenderRowProps, Row } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import useStyles from './style/style';
import { ITask } from '@/providers/taskProvider/context';
import { title } from 'process';

const { Title, Paragraph } = Typography;

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
    const role = useMemo(() => getRole(loginObj), []);

    // we need to do a foreach for the properties of the object ITask
    // {
    //     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //     "creationTime": "2024-04-24T17:26:43.946Z",
    //     "creatorUserId": 0,
    //     "lastModificationTime": "2024-04-24T17:26:43.946Z",
    //     "lastModifierUserId": 0,
    //     "isDeleted": true,
    //     "deleterUserId": 0,
    //     "deletionTime": "2024-04-24T17:26:43.946Z",
    //     "title": "string",
    //     "description": "string",
    //     "ownerId": 0,
    //     "amount": 0,
    //     "views": 0,
    //     "timeFrame": 0,
    //     "status": 0
    //   }

    const columns = [
        {
            title: 'Creator',
            dataIndex: 'creatorUserId',
            key: 'creatorUserId'
        },
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
            status: task.status,
            // creationTime: task.creationTime,
            creatorUserId: task.creatorUserId,
            // lastModificationTime: task.lastModificationTime,
            // lastModifierUserId: task.lastModifierUserId,
            // isDeleted: task.isDeleted,
            // deleterUserId: task.deleterUserId,
            // deletionTime: task.deletionTime
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
                <Table columns={columns} dataSource={rows} />
            </section>
        </section>
    );
}

export default Page;