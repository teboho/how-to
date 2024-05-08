"use client";
import { useAuthActions, useAuthState } from "@/providers/authProvider";
import { useCategoriesState, useCategoryActions } from "@/providers/categoryProvider";
import { usePortfolioActions, usePortfolioState } from "@/providers/portfolioProvider";
import { useProfileActions, useProfileState } from "@/providers/profileProvider";
import { EditOutlined, EllipsisOutlined, MessageOutlined, SearchOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Flex, Input, Layout, Rate, Select, Tag, Typography } from "antd";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import useStyles from "./style";
import Link from "next/link";
import Image from "next/image";

const { Meta } = Card;
const { Sider, Content } = Layout;
const { Title } = Typography;

const img_base = process.env.NEXT_PUBLIC_API_IMAGE_URL_PRE;

const Page = () => {
    const { users } = useAuthState();
    const { getAllUsers } = useAuthActions();
    const { getPortfolios, getAllPortfolios } = usePortfolioActions();
    const { portfolios } = usePortfolioState();
    const { getProfiles, getLocalProfile } = useProfileActions();
    const { profiles } = useProfileState();
    const { getCategories, getExecutorCategories, getLocalExecutorCategories } = useCategoryActions();
    const { categories, executorCategories } = useCategoriesState();
    const { cx, styles } = useStyles();
    const [_users, setUsers] = useState([]);

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

    const readCategory = (id: string) => {
        return categories?.find(c => c.id === id);
    }

    const temp = users?.filter(u => u.roleNames?.includes("EXECUTOR")).map((u, i) => {
        const p = getLocalProfile(u.id);
        const profileLink = p ? (p?.username ? `/home/profile?username=${p?.username}` : `/home/profile?profileId=${p.id}`) : "";
        return (
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
                    // <MessageOutlined key="chat" />,
                    p ? (<Link href={profileLink}>
                        <EyeOutlined key="view_executor_profile" title="View profile" />
                    </Link>) : <EyeInvisibleOutlined key="view_executor_profile" title="This user does not yet have a profile" />,
                    // <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar alt="ddd" src={`${img_base}${p?.storedFileId || "a9dd968a-daa8-4564-86ce-08dc6da6959e"}`} />}
                    title={u.fullName}
                    description={
                        <>
                            Avg. Rating
                            <Rate defaultValue={3} style={{ color: "green" }} />
                            {getLocalExecutorCategories(p?.id || "")?.map((ec, i) => (
                                <Tag key={"tag_${i}"}>
                                    {readCategory(ec.categoryId)?.title}
                                </Tag>
                            ))}

                        </>
                    }
                />
            </Card>
        )
    });

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

                            const search = values.search;
                            const results = users?.filter(u => u.name.toLowerCase().includes(search.toLowerCase())
                                || u.emailAddress.toLowerCase().includes(search.toLowerCase())
                                || u.surname.toLowerCase().includes(search.toLowerCase())
                                || u.userName.toLowerCase().includes(search.toLowerCase()));

                            // setUsers(results || []);
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

                            const _categories = values._categories;
                            // const _executorCategories = executorCategories?.filter(ec => _categories.includes(values.));
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
                            temp
                        }
                    </Flex>
                </Content>
            </Layout>
        </div>
    );
}

export default Page;