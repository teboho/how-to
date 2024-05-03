"use client";
import { useAuthState } from "@/providers/authProvider";
import { usePortfolioActions, usePortfolioState } from "@/providers/portfolioProvider";
import { useProfileActions, useProfileState } from "@/providers/profileProvider";
import { Avatar, Button, Card, Divider, Flex, Input, Layout, Typography, Select } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useEffect } from "react";
import useStyles from "./style.ts";
import { Field, Form, Formik } from "formik";
import { useCategoriesState, useCategoryActions } from "@/providers/categoryProvider";

const { Meta } = Card;
const { Sider, Content } = Layout;
const { Title } = Typography;

const Page = () => {
    const { loginObj } = useAuthState();
    const { getPortfolios } = usePortfolioActions();
    const { portfoliosWithStoredFiles } = usePortfolioState();
    const { } = useProfileActions();
    const { } = useProfileState();
    const { getCategories, getExecutorCategories } = useCategoryActions();
    const { categories, executorCategories } = useCategoriesState();
    const { cx, styles } = useStyles();

    useEffect(() => {
        if (!categories) {
            getCategories();
        }
        if (executorCategories) {
            getExecutorCategories();
        }
    }, []);

    let cards = [];
    for (let i = 0; i < 50; i++) {
        cards.push(
            <Card
                key={`card__${i}`}
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src="/unDraw/covers/undraw_add_tasks_re_s5yj.svg"
                    />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        );
    }

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
                                        <Button type="primary" onClick={handleSubmit}>
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
                                    render={({ field }) => (
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
                                />
                            </Form>
                        )}
                    </Formik>
                </Sider>
                <Content className={cx(styles.content)}>
                    <Flex gap={20} wrap="wrap" align="center" justify="center">
                        {cards}
                    </Flex>
                </Content>
            </Layout>
        </div>
    );
}

export default Page;