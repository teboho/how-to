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
    UserOutlined,
    CreditCardOutlined,
    UsergroupAddOutlined,
    SolutionOutlined,
    CarryOutOutlined
} from '@ant-design/icons';
import { Button, Flex, Layout, Menu, MenuProps, Typography } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useStyles from "./style/style";
import AccountDrawer, { IAccountDrawerProps } from "@/components/accountDrawer";
import Image from "next/image";

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

const HomeLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState<MenuProps["items"]>([]);
    const { loginObj, decodedToken, userObj } = useAuthState();
    const { logout: auth_logout } = useAuthActions();
    const { } = useAuthActions
    const { styles, cx, theme } = useStyles();
    const pathname = usePathname();
    const { push } = useRouter();

    // useEffect()

    const fullname = useMemo(() => userObj ? `${userObj.name} ${userObj.surname}` : "John Doe", [userObj]);

    const clientMenu = (currentPath: string): MenuProps["items"] => [
        // {
        //     key: 'client_expenditure',
        //     icon: <CreditCardOutlined />,
        //     label: <Link href={`/home/client/expenditure`}>Expenditure</Link>,
        //     onClick: () => { }
        // },
        {
            key: 'client_new_task',
            icon: <PlusCircleOutlined />,
            className: cx(styles["white-link"]),
            label: <Link href={`/home/client/new-task`}>New Task</Link>,
            onClick: () => { }
        },
        {
            key: 'executors',
            icon: <SolutionOutlined />,
            className: cx(styles["white-link"]),
            label: <Link href={`/home/executors`}>Executors</Link>,
            onClick: () => { }
        }
    ];
    const executorMenu = (currentPath: string): MenuProps["items"] => [
        {
            key: 'tasks',
            icon: <CarryOutOutlined />,
            className: cx(styles["white-link"]),
            label: <Link href={`/home/tasks`}>Tasks</Link>,
            onClick: () => { }
        },
        {
            key: 'executors',
            icon: <SolutionOutlined />,
            className: cx(styles["white-link"]),
            label: <Link href={`/home/executors`}>Executors</Link>,
            onClick: () => { }
        }
    ];
    const supportMenu = (currentPath: string): MenuProps["items"] => [
        {
            key: 'tasks',
            icon: <CarryOutOutlined />,
            className: cx(styles["white-link"]),
            label: <Link href={`/home/tasks`}>Tasks</Link>,
            onClick: () => { }
        },
        {
            key: 'support_disputes',
            icon: <ExclamationCircleOutlined />,
            className: cx(styles["white-link"]),
            label: <Link href={`/home/support/disputes`}>Disputes</Link>,
            onClick: () => { }
        },
        {
            key: 'support_users',
            icon: <UsergroupAddOutlined />,
            className: cx(styles["white-link"]),
            label: <Link href={`/home/support/new-user`}>Manager Users</Link>,
            onClick: () => { }
        },
        {
            key: 'executors',
            icon: <SolutionOutlined />,
            className: cx(styles["white-link"]),
            label: <Link href={`/home/executors`}>Executors</Link>,
            onClick: () => { }
        }
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
                case "admin":
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

    const AccountDrawerProps: IAccountDrawerProps = {
        emailAddress: `${decodedToken && decodedToken[AbpTokenProperies.emailaddress]}`,
        fullname: `${decodedToken && decodedToken[AbpTokenProperies.name]}`,
        isDrawerOpen: open,
        onDrawerClose: () => {
            setOpen(false);
        },
        profilePicId: undefined,
        role,
        showDrawer: () => {
            setOpen(true);
        }
    }

    return (
        <Layout className={cx(styles.layout)}>
            <Sider className={cx(styles.sider)} style={{
                background: "#B64326"
            }} width={320} theme="light" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
                <div className={cx(styles.logo)}>
                    <Link href={"/"}><Image src="/logo-icon-only-light.svg" alt="logo" width={80} height={80} /></Link>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    onClick={() => { }}
                    items={[...(menu ? menu : []), ...[
                        // {
                        //     key: 'profile',
                        //     icon: <UserOutlined />,
                        //     label: <Link href={"/home/profile/edit"}>Edit Profile</Link>,
                        //     className: cx(styles["white-link"]),
                        //     onClick: () => { }
                        // },
                        {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: 'Logout',
                            className: cx(styles["white-link"]),
                            onClick: () => auth_logout()
                        }
                    ]]}
                    className={cx(styles.menu)}
                />
            </Sider>
            <Layout className={cx(styles.layout)}>
                <Header className={cx(styles.header)}>
                    <Flex justify="space-between" align="center" className={cx(styles.offsetUp)}>
                        <Title level={1} style={{
                            marginTop: 10,
                            letterSpacing: 2
                        }}>HowTo</Title>

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 20
                        }}>
                            <h3>{fullname}</h3>
                            <Button
                                title="user account"
                                type="primary"
                                shape="circle"
                                icon={<UserOutlined />}
                                onClick={() => {
                                    setCollapsed(!collapsed);
                                    setOpen(true);
                                }}
                            />
                        </div>
                        <AccountDrawer {...AccountDrawerProps} />
                    </Flex>
                </Header>
                <Content className={cx(styles.content)}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomeLayout;