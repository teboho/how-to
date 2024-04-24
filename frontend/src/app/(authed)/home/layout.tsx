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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthState } from "@/providers/authProvider";
import { AbpTokenProperies, decodeToken } from "@/utils";

const { Sider, Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const clientMenu: MenuProps["items"] = [
    {
        key: 'client_expenditure',
        icon: <ShoppingCartOutlined />,
        label: 'Expenditure',
    },
    {
        key: 'client_tasks',
        icon: <ScheduleOutlined />,
        label: 'My Tasks',
    },
    {
        key: 'client_new_task',
        icon: <PlusCircleOutlined />,
        label: 'New Task',
    }
];
const executorMenu: MenuProps["items"] = [
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
const supportMenu: MenuProps["items"] = [
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

const menu = {
    "client": clientMenu,
    "executor": executorMenu,
    "support": supportMenu,
}

const HomeLayout = ({ 
    children 
}: {
    children: React.ReactNode
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const { loginObj } = useAuthState();
    const { styles, cx, theme } = useStyles();
    const { push } = useRouter();

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
            _menu = clientMenu;
        case "executor":
            _menu = executorMenu;
        case "support":
            _menu = supportMenu;
        default:
            _menu = clientMenu;
    }
    return (
        <Layout className={cx(styles.layout)}>
            <Sider className={cx(styles.sider)} theme="light" collapsible collapsed={collapsed} onCollapse={()=> setCollapsed(!collapsed)}>
                <div className="logo-vertical">
                    <Link href={""}><img src="/logo.svg" alt="logo" width={"100%"} /></Link>
                </div>
                <Menu 
                    theme="light"
                    mode="inline"
                    onClick={() => {}}
                    items={_menu}
                    className={cx(styles.menu)}
                />
            </Sider>
            <Layout className={cx(styles.layout)}>
                <Header className={cx(styles.header)}>
                    <Title level={1}>{role} Dashboard</Title>
                </Header>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomeLayout;