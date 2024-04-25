"use client";

import { useMemo, useState } from "react";
import { Button, Layout, Menu, MenuProps, Typography  } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  ReadOutlined,
  UsergroupAddOutlined,
  MoneyCollectOutlined,
  ScheduleOutlined,
  ExclamationCircleOutlined,
  ShoppingCartOutlined,
  PlusCircleOutlined, 
  LogoutOutlined
} from '@ant-design/icons';
import useStyles from "./style/style";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthActions, useAuthState } from "@/providers/authProvider";
import { AbpTokenProperies, decodeToken } from "@/utils";
import { log } from "console";

const { Sider, Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const clientMenu = (currentPath: string): MenuProps["items"] => [
    {
        key: 'client_expenditure',
        icon: <ShoppingCartOutlined />,
        label: <Link href={`${currentPath}/expenditure`}>Expenditure</Link>,
        onClick: () => {}
    },
    // {
    //     key: 'client_tasks',
    //     icon: <ScheduleOutlined />,
    // label: <Link href={`${currentPath}/my-tasks`}>My Tasks</Link>,
    // },
    {
        key: 'client_new_task',
        icon: <PlusCircleOutlined />,
        label: <Link href={`${currentPath}/new-task`}>New Task</Link>,
        onClick: () => {}
    }
];
const executorMenu = (currentPath: string): MenuProps["items"] => [
    {
        key: 'exec_revenue',
        icon: <MoneyCollectOutlined />,
        label: 'Revenue'
    },
    {
        key: 'exec_tasks',
        icon: <ScheduleOutlined />,
        label: 'Tasks'
    },
    {
        key: 'exec_guides',
        icon: <ReadOutlined />,
        label: 'Tasks'
    },
    {
        key: 'exec_new_guide',
        icon: <PlusCircleOutlined />,
        label: 'Tasks'
    },
];
const supportMenu = (currentPath: string): MenuProps["items"] => [
    {
        key: 'support_revenue',
        icon: <MoneyCollectOutlined />,
        label: 'Revenue'
    },
    {
        key: 'support_tasks',
        icon: <ScheduleOutlined />,
        label: 'Tasks'
    },
    {
        key: 'support_disputes',
        icon: <ExclamationCircleOutlined />,
        label: 'Disputes'
    },
    {
        key: 'support_users',
        icon: <UsergroupAddOutlined />,
        label: 'Users'
    },
];


const HomeLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const { loginObj } = useAuthState();
    const { logout: auth_logout } = useAuthActions();
    const { styles, cx, theme } = useStyles();
    const pathname = usePathname();

    let role: string = useMemo(() => {
        if (loginObj) {
            const decoded = decodeToken(loginObj.accessToken);
            return decoded[AbpTokenProperies.role];
        } 
        
        return "client";
    }, []);   

    let _menu;    
    switch(role) {
        case "client":
            _menu = clientMenu(pathname);
        case "executor":
            _menu = executorMenu(pathname);
        case "support":
            _menu = supportMenu(pathname);
        default:
            _menu = clientMenu(pathname);
    }

    return (
        <Layout className={cx(styles.layout)}>
            <Sider className={cx(styles.sider)} theme="light" collapsible collapsed={collapsed} onCollapse={()=> setCollapsed(!collapsed)}>
                <div className="logo-vertical">
                    <Link href={"/"}><img src="/logo.svg" alt="logo" width={"100%"} /></Link>
                </div>
                <Menu 
                    theme="light"
                    mode="inline"
                    onClick={() => {}}
                    items={_menu}
                    className={cx(styles.menu)}
                />
                {/* Profile menu */}
                <Menu 
                    theme="light"
                    mode="inline"
                    onClick={() => {}}
                    items={[
                        {
                            key: 'profile',
                            icon: <UsergroupAddOutlined />,
                            label: 'Profile',
                            onClick: () => {}
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