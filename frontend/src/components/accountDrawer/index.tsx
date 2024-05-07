'use client';

import { useAuthActions } from "@/providers/authProvider";
import { useProfileState } from "@/providers/profileProvider";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, DrawerProps, Flex } from 'antd';
import React, { useMemo } from 'react';
import useStyles from "./style";
import { useRouter } from 'next/navigation';

export interface IAccountDrawerProps {
    fullname: string;
    emailAddress: string;
    profilePicId?: string;
    role: string;
    showDrawer: () => void;
    onDrawerClose: () => void;
    isDrawerOpen: boolean;
}

const AccountDrawer = ({
    fullname,
    emailAddress,
    role,
    showDrawer,
    onDrawerClose,
    isDrawerOpen
}: IAccountDrawerProps): React.ReactNode => {
    const { logout } = useAuthActions();
    const { profile } = useProfileState();
    const { cx, styles } = useStyles();
    const { push } = useRouter();

    let profilePicId = useMemo(() => {
        return profile?.storedFileId
    }, [])

    return (
        <>
            {/* <Button style={{ borderRadius: "50%" }} onClick={showDrawer} icon={<UserOutlined />}></Button> */}
            <Drawer
                title="Profile information"
                placement={"right" as DrawerProps["placement"]}
                closable={false}
                onClose={onDrawerClose}
                open={isDrawerOpen}
                key={"right"}
                style={{
                    background: "#E5E3D2"
                }}
                className={cx(styles.drawer)}
            >
                <Flex vertical justify="center" align="center">
                    <div>
                        {
                            profilePicId ? <img src={`${encodeURI(`https://localhost:44311/GetStoredFile/${profilePicId}`)}`} width={64} height={64} alt="profile" />
                                :
                                <Avatar src={profilePicId && `/GetStoredFile/${profilePicId}`} size={64} icon={<UserOutlined />} />
                        }
                    </div>
                    <div>
                        <p><i style={{ width: 30, height: 30 }} className="ri-profile-fill"></i> {fullname}</p>
                        <p><i className="ri-mail-line"></i> {emailAddress}</p>
                        <p><i className="ri-safe-line"></i> {role}</p>
                    </div>
                    <hr />
                    <Button onClick={() => push("/home/profile/edit")}>Edit Profile</Button>
                    <br />
                    <Button onClick={logout}>Logout</Button>
                </Flex>
            </Drawer>
        </>
    )
}

export default AccountDrawer;