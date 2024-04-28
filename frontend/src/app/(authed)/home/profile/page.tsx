"use client";

import { Typography, Form, Input, FormProps, Button } from "antd";
import useStyles from "./style";
import { IProfile } from "@/providers/profileProvider/context";
import { useAuthState } from "@/providers/authProvider";
import { useProfileActions, useProfileState } from "@/providers/profileProvider";
import { useEffect, useMemo } from "react";

const { Title } = Typography;

type FieldType = IProfile;

const Page = (): React.ReactNode => {
    const { loginObj } = useAuthState();
    const { postProfile, getMyProfile } = useProfileActions();
    const { profile } = useProfileState();
    const { styles, cx } = useStyles();

    useEffect(() => {
        if (loginObj && loginObj?.userId) {
            // getMyProfile();
        }
    }, []);

    const identityNo = useMemo(() => { 
        console.log('profile', profile);
        return profile?.identityNo
    }, [profile]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        values.creatorUserId = loginObj?.userId;
        console.log('Success:', values);
        if (profile) {
            values.id = profile.id;
            postProfile(values);
            return;
        }
        postProfile(values);
      }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <section>
            <Title level={2}>Profile</Title>  
            <Form
                name="login form"
                layout="vertical"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
                className={cx(styles.form)}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{...profile, identityNo }}
            >
                <Form.Item<FieldType>
                    label="Identity No"
                    name="identityNo"
                    rules={[{ required: true, message: 'Please input a valid identity number!', pattern: /^[0-9]{13}$/, max: 13 }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        </section>
    );
};

export default Page;