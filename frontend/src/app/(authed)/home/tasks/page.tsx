"use client";
import TaskCategories from "@/components/taskCategories";
import { useAuthState } from "@/providers/authProvider";
import { useCategoriesState, useCategoryActions } from "@/providers/categoryProvider";
import { usePortfolioActions, usePortfolioState } from "@/providers/portfolioProvider";
import { useTaskActions, useTaskState } from "@/providers/taskProvider";
import { ITask } from "@/providers/taskProvider/context.js";
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Flex, Input, Layout, Select, Tag, Typography } from "antd";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import useStyles from "./style.ts";

const { Meta } = Card;
const { Sider, Content } = Layout;
const { Title } = Typography;

const pickStatus = (status: number): React.ReactNode => {
    switch (status) {
        case 0:
            return <Tag color="blue">NEW</Tag>;
        case 1:
            return <Tag color="orange">ASSIGNED</Tag>;
        case 2:
            return <Tag color="green">DONE</Tag>;
    }
}

const Page = () => {
    const { loginObj } = useAuthState();
    const { getPortfolios } = usePortfolioActions();
    const { portfoliosWithStoredFiles } = usePortfolioState();
    const { getTasks } = useTaskActions();
    const { tasks } = useTaskState();
    const { getCategories, getExecutorCategories, getTaskCategories, getLocalCategory, getLocalTaskCategories } = useCategoryActions();
    const { categories, executorCategories, taskCategories } = useCategoriesState();
    const { cx, styles } = useStyles();

    useEffect(() => {
        if (!categories) {
            getCategories();
        }
        if (!executorCategories) {
            getExecutorCategories();
        }
        if (!tasks) {
            getTasks();
        }
        if (!taskCategories) {
            getTaskCategories();
        }
    }, []);


    const handleFilter = () => {

    }

    let _tasks = useMemo(() => {
        return tasks?.map((task: ITask, index: number) => (
            <Card
                key={`task_card__${index}`}
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src="/unDraw/covers/undraw_add_tasks_re_s5yj.svg"
                    />
                }
                actions={[
                    <Link href={`/home/view-task?id=${task.id}`}>
                        <EyeOutlined key="view_task" />
                    </Link>,
                    // <EditOutlined key="edit" />,
                    // <EllipsisOutlined key="ellipsis" />, // popover for description
                ]}
            >
                <Meta
                    // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={task.title}
                    description={
                        <>
                            {pickStatus(task.status)}
                            <br />
                            {
                                new Date(task?.creationTime || "").toLocaleString('en-ZA', { timeZone: 'UTC' })
                            }
                            <br />
                            <TaskCategories taskId={task?.id} />
                        </>
                    }
                />
                <TaskCategories taskId={task?.id} /><TaskCategories taskId={task?.id} />
            </Card>
        ));
    }, [tasks])

    return (
        <div className="height-full">
            <Layout className={cx(styles.layout)}>
                <Sider width={300} className={cx(styles.sider)} style={{
                    background: '#E5E3D2'
                }}>
                    <Title level={2}>Tasks</Title>
                    <Divider>Search</Divider>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{ search: 'programming' }}
                        onSubmit={(values, actions) => {
                            console.log(values);
                            actions.setSubmitting(false);
                        }}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    name="search"
                                    type="text"
                                    as={Input}
                                    suffix={
                                        <Button type="primary" onClick={e => handleSubmit()}>
                                            <SearchOutlined />
                                        </Button>
                                    }
                                />
                            </Form>
                        )}
                    </Formik>
                    <Divider>Filter</Divider>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{ _categories: [] }}
                        onSubmit={(values, actions) => {
                            console.log(values);
                            actions.setSubmitting(false);
                        }}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    name="_categories"
                                >
                                    {({ field }: { field: any }) => (
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Select categories"
                                            defaultValue={[]}
                                            onChange={(value) => {
                                                console.log(value);
                                            }}
                                            options={categories?.map((category) => {
                                                return {
                                                    label: category.title,
                                                    value: category.id
                                                }
                                            })}
                                        />
                                    )}
                                </Field>
                            </Form>
                        )}
                    </Formik>
                </Sider>
                <Content className={cx(styles.content)}>
                    <Flex gap={20} wrap="wrap" align="center" justify="center">
                        {_tasks}
                    </Flex>
                </Content>
            </Layout>
        </div>
    );
}

export default Page;