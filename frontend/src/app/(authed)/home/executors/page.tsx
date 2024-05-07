"use client";
import { useAuthActions, useAuthState } from "@/providers/authProvider";
import { useCategoriesState, useCategoryActions } from "@/providers/categoryProvider";
import { usePortfolioActions, usePortfolioState } from "@/providers/portfolioProvider";
import { useProfileActions, useProfileState } from "@/providers/profileProvider";
import { EditOutlined, EllipsisOutlined, MessageOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Flex, Input, Layout, Rate, Select, Typography } from "antd";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import useStyles from "./style";

const { Meta } = Card;
const { Sider, Content } = Layout;
const { Title } = Typography;

const img_base = process.env.NEXT_PUBLIC_API_IMAGE_URL_PRE;

const Page = () => {
    const { users } = useAuthState();
    const { getAllUsers } = useAuthActions();
    const { getPortfolios, getAllPortfolios } = usePortfolioActions();
    const { portfolios } = usePortfolioState();
    const { getProfiles } = useProfileActions();
    const { profiles } = useProfileState();
    const { getCategories, getExecutorCategories } = useCategoryActions();
    const { categories, executorCategories } = useCategoriesState();
    const { cx, styles } = useStyles();

    useEffect(() => {
        if (!categories) {
            getCategories();
        }
        if (!executorCategories) {
            getExecutorCategories();
        }
        if (!portfolios) {
            getPortfolios();
            getAllPortfolios();
        }
        if (!users) {
            getAllUsers();
        }
        if (!profiles) {
            getProfiles();
        }
    }, []);

    console.log(img_base)

    let _users = users?.filter(u => u.roleNames?.includes("EXECUTOR")).map((u, i) => (
        <Card
            key={`usercard__${i}`}
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src="/unDraw/covers/undraw_add_tasks_re_s5yj.svg"
                />
            }
            actions={[
                <MessageOutlined key="chat" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                avatar={<Avatar alt="ddd" src={`${img_base}a9dd968a-daa8-4564-86ce-08dc6da6959e`} />}
                title={u.fullName}
                description={
                    <>
                        Rating
                        <Rate defaultValue={3} style={{ color: "green" }} />
                    </>
                }
            />
        </Card>
    ));

    return (
        <div className="height-full">
            <Layout className={cx(styles.layout)}>
                <Sider width={300} className={cx(styles.sider)} style={{
                    background: '#E5E3D2'
                }}>
                    <Title level={2}>Executors</Title>
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
                                        <Button type="primary" onClick={() => handleSubmit()}>
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
                                    {() => (
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
                    <Divider>Ratings</Divider>
                </Sider>
                <Content className={cx(styles.content)}>
                    <Flex gap={20} wrap="wrap" align="center" justify="center">
                        {
                            _users
                        }
                    </Flex>
                </Content>
            </Layout>
        </div>
    );
}

export default Page;