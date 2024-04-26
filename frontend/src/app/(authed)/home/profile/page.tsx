"use client";

import { Typography, Form, Input, FormProps } from "antd";
import useStyles from "./style";
import { IProfile } from "@/providers/profileProvider/context";

const { Title } = Typography;

type FieldType = IProfile;

const Page = (): React.ReactNode => {
    const { styles, cx } = useStyles();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
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
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Identity No"
                    name="identityNo"
                    rules={[{ required: true, message: 'Please input your identity number!', pattern: /^[0-9]{13}$/, max: 13 }]}
                >
                    <Input size="large"/>
                </Form.Item>
                {/* <Form.Item<FieldType>
                    label=""
                    name="isVerified"
                    rules={[{ required: true, message: 'Please input your surname!' }]}
                    >
                    <Input size="large" />
                </Form.Item> */}
            </Form>
        </section>
    );
};

export default Page;