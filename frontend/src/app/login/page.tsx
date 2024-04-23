"use client";

import React from "react";
import useStyles from "./style/style";
import type {FormProps} from "antd";
import { Button, Flex, Typography, Form, Input } from "antd";
import LeftSide from "@/components/leftSide";

const { Title, Paragraph } = Typography;

// Each time, a new form item will be one of the following properties
type FieldType = {
  usernameOrEmail?: string;
  password?: string;
  remember?: string;
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
}

export default function Login() {
  const { cx, styles } = useStyles();
  
  return (
    <Flex className={cx(styles["h-full"])}>
      <LeftSide />
      <div className={cx("half-box", "right")}>
        <Flex vertical className={cx(styles["right-inner-flex"])}  align="center" justify="center">
          <Paragraph className={cx(styles.para)}>Please enter your details to login.</Paragraph>

          <Form
            name="login form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            className={cx(styles.form)}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="usernameOrEmail"
              rules={[{ required: true, message: 'Please input your username/email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
              className={cx(styles['form-item'])}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>          
                <Button className={cx(styles.button)} htmlType="submit" size="large">
                  Login
                </Button>
            </Form.Item>
          </Form>
        </Flex>
      </div>
    </Flex>
  );
}
