"use client";
import { useAuthState } from '@/providers/authProvider';
import { useTaskActions, useTaskState } from '@/providers/taskProvider';
import { getRole } from '@/utils';
import { Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import DataGrid, { RenderRowProps, Row } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import useStyles from './style/style';

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
    const { styles, cx, theme } = useStyles();
    const { loginObj } = useAuthState();
    const { getMyTasks } = useTaskActions();
    const { tasks } = useTaskState();

    useEffect(() => {
        const axios = require('axios');
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
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' },
        { key: 'description', name: 'Description' },
        // { key: 'ownerId', name: 'Owner ID' },
        { key: 'amount', name: 'Amount' },
        { key: 'views', name: 'Views' },
        { key: 'timeFrame', name: 'Time Frame' },
        { key: 'status', name: 'Status' },
        // { key: 'creationTime', name: 'Creation Time' },
        { key: 'creatorUserId', name: 'Creator User ID' },
        // { key: 'lastModificationTime', name: 'Last Modification Time' },
        // { key: 'lastModifierUserId', name: 'Last Modifier User ID' },
        // { key: 'isDeleted', name: 'Is Deleted' },
        // { key: 'deleterUserId', name: 'Deleter User ID' },
        // { key: 'deletionTime', name: 'Deletion Time' }
      ];
      
      const rows = tasks?.map((task) => {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            // ownerId: task.ownerId,
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

    const rowKeyGetter = (row: typeof Row) => row.id;

    function myRowRenderer(key: React.Key, props: RenderRowProps<typeof Row>) {
        return (
            <Row className={cx(styles.row)} {...props} />
        );
    }

    return (
        <section>
            <section className={cx(styles.box)}>
                <Title level={3}>Money Spent so far</Title>
                <Paragraph className={cx(styles["total-money"])}>R7 564.07</Paragraph>
                
            </section>
            <section className={cx(styles.box)}>
                Tasks/Transactions
                <DataGrid
                    className={cx(styles.light)}
                    columns={columns}
                    rows={rows || []}
                    rowKeyGetter={rowKeyGetter}
                    renderers={{ 
                        renderRow: myRowRenderer,
                    }}
                    sortColumns={[
                        { columnKey: 'title', direction: 'ASC' }, 
                        { columnKey: 'amount', direction: 'ASC' }
                    ]}
                />
            </section>
        </section>
    );
}

export default Page;