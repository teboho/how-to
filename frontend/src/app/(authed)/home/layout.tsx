"use client";

import { useAuthActions, useAuthState } from "@/providers/authProvider";
import { AbpTokenProperies, decodeToken } from "@/utils";
import {
    ExclamationCircleOutlined,
    LogoutOutlined,
    MoneyCollectOutlined,
    PlusCircleOutlined,
    ReadOutlined,
    ScheduleOutlined,
    CreditCardOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, Typography } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useStyles from "./style/style";

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

const HomeLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [menu, setMenu] = useState<MenuProps["items"]>([]);
    const { loginObj } = useAuthState();
    const { logout: auth_logout } = useAuthActions();
    const { styles, cx, theme } = useStyles();
    const pathname = usePathname();
    const { push } = useRouter();

    const clientMenu = (currentPath: string): MenuProps["items"] => [
        {
            key: 'client_expenditure',
            icon: <CreditCardOutlined />,
            label: <Link href={`${currentPath}/expenditure`}>Expenditure</Link>,
            onClick: () => { }
        },
        {
            key: 'client_new_task',
            icon: <PlusCircleOutlined />,
            label: <Link href={`${currentPath}/new-task`}>New Task</Link>,
            onClick: () => { }
        }
    ];
    const executorMenu = (currentPath: string): MenuProps["items"] => [
        {
            key: 'exec_revenue',
            icon: <MoneyCollectOutlined />,
            label: <Link href={`${currentPath}/revenue`}>Revenue</Link>,
            onClick: () => { }
        },
        {
            key: 'exec_tasks',
            icon: <ScheduleOutlined />,
            label: <Link href={`${currentPath}/tasks`}>Tasks</Link>,
            onClick: () => { }
        },
        {
            key: 'exec_guides',
            icon: <ReadOutlined />,
            label: <Link href={`${currentPath}/guides`}>Guides</Link>,
            onClick: () => { }
        },
        {
            key: 'exec_new_guide',
            icon: <PlusCircleOutlined />,
            label: <Link href={`${currentPath}/new-guide`}>New Guide</Link>,
            onClick: () => { }
        },
    ];
    const supportMenu = (currentPath: string): MenuProps["items"] => [
        {
            key: 'support_revenue',
            icon: <MoneyCollectOutlined />,
            label: <Link href={`${currentPath}/revenue`}>Revenue</Link>,
            onClick: () => { }
        },
        {
            key: 'support_tasks',
            icon: <ScheduleOutlined />,
            label: <Link href={`${currentPath}/tasks`}>Tasks</Link>,
            onClick: () => { }
        },
        {
            key: 'support_disputes',
            icon: <ExclamationCircleOutlined />,
            label: <Link href={`${currentPath}/disputes`}>Disputes</Link>,
            onClick: () => { }
        },
        {
            key: 'support_users',
            icon: <UsergroupAddOutlined />,
            label: <Link href={`${currentPath}/users`}>Manager Users</Link>,
            onClick: () => { }
        },
    ];

    let role: string = useMemo(() => {
        if (loginObj) {
            const decoded = decodeToken(loginObj.accessToken);
            const _role = `${decoded[AbpTokenProperies.role]}`.toLocaleLowerCase();

            switch (_role.toLocaleLowerCase()) {
                case "client":
                    setMenu(clientMenu(pathname));
                    break;
                case "executor":
                    setMenu(executorMenu(pathname));
                    break;
                case "support":
                    setMenu(supportMenu(pathname));
                    break;
                default:
                    setMenu([]);
                    break;
            }

            return _role;
        } else {
            return "client";
        }
    }, [loginObj]);

    return (
        <Layout className={cx(styles.layout)}>
            <Sider className={cx(styles.sider)} theme="light" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
                <div className="logo-vertical">
                    <Link href={"/"}><img src="/logo.svg" alt="logo" width={"100%"} /></Link>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    onClick={() => { }}
                    items={menu}
                    className={cx(styles.menu)}
                />
                <Menu
                    theme="light"
                    mode="inline"
                    onClick={() => { }}
                    items={[
                        {
                            key: 'profile',
                            icon: <UsergroupAddOutlined />,
                            label: 'Profile',
                            onClick: () => push('profile')
                        },
                        {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: 'Logout',
                            onClick: () => auth_logout()
                        }
                    ]}
                    className={cx(styles.menu)}
                />
            </Sider>
            <Layout className={cx(styles.layout)}>
                <Header className={cx(styles.header)}>
                    <Title level={1}>{role} Dashboard</Title>
                </Header>
                <Content className={cx(styles.content)}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomeLayout;