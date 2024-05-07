"use client";
import { Button, Flex, Form, type FormProps, Input, Layout, Select, Table, Typography } from "antd";
import useStyles from "./style";
import { useAuthActions, useAuthState } from "@/providers/authProvider";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { IRegisterRequest, IUser } from "@/providers/authProvider/types";

const { Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

type FieldType = {
    name: string;
    surname: string;
    emailAddress?: string;
    password: string;
    confirm?: string;
    role: "SUPPORT";
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
}

function Register() {
    const { cx, styles } = useStyles();
    const { registerSupport } = useAuthActions();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        if (values.confirm !== values.password) {
            return alert("Confirm must match the password.");
        }
        console.log('Success:', values);
        const registerRequest: IRegisterRequest = values;
        registerRequest.isActive = true;
        registerRequest.roleNames = ["SUPPORT"]
        registerRequest.userName = values.emailAddress;

        registerSupport(registerRequest);
    }

    return (
        <Flex vertical className={cx(styles["right-inner-flex"])} align="center" justify="center">
            <Title level={3}>Register a new support team member.</Title>
            <Form
                name="login form"
                layout="vertical"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
                className={cx(styles.form)}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Surname"
                    name="surname"
                    rules={[{ required: true, message: 'Please input your surname!' }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item<FieldType>
                    label="email"
                    name="emailAddress"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                    className={cx(styles['form-item'])}
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Confirm Password"
                    name="confirm"
                    rules={[{ required: true, message: "Please confirm your password!" }]}
                    className={cx(styles['form-item'])}
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item>
                    <Flex align="center" justify="space-between" vertical>
                        <Button className={cx(styles.button)} htmlType="submit" size="large">
                            Register
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Flex>
    );
}


const Page = () => {
    const { cx, styles } = useStyles();
    const { users } = useAuthState();
    const { getAllUsers } = useAuthActions();
    const [data, setData] = useState<IUser[] | undefined>();

    useEffect(() => {
        if (!users) {
            getAllUsers();
        }
    }, []);

    useEffect(() => setData(users), [users]);

    const columns = [
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName"
        },
        {
            title: "Email Address",
            dataIndex: "emailAddress",
            key: "emailAddress"
        },
        {
            title: "Role Names",
            dataIndex: "roleNames",
            key: "roleNames"
        },
    ]

    const onInputChange = (e: any) => {
        const _users = users?.filter(u => u.emailAddress.includes(e.target.value) || u.emailAddress.includes(e.target.value));
        setData(_users);
    }

    return (
        <Layout className={cx(styles.layout)}>
            <Sider width={"500"} style={{ background: "#E5E3D2" }} className={cx(styles.sider)}>
                <Flex vertical={true} align="center" justify="center" gap={20}>
                    <Title level={2}>Manage users</Title>
                    <div>
                        <label htmlFor="search">Search:</label> <Input id="search" onChange={onInputChange} />
                    </div>
                    <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} scroll={{ y: 360 }} />
                </Flex>
            </Sider>
            <Content className={cx(styles.content)}>
                <Register />
            </Content>
        </Layout>
    );
}

export default Page;