"use client";

import React from "react";
import useStyles from "./style";
import type {FormProps} from "antd";
import { Button, Flex, Typography, Form, Input, Space } from "antd";
import LeftSide from "@/components/leftSide";
import Link from "next/link";
import { useAuthActions } from "@/providers/authProvider";
import { ILoginRequest } from "@/providers/authProvider/types";

const { Paragraph } = Typography;

// Each time, a new form item will be one of the following properties
type FieldType = {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient?: boolean;
}

export default function Login() {
  const { cx, styles } = useStyles();
  const { login } = useAuthActions();
  
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    const loginRequest: ILoginRequest = values;
    loginRequest.rememberClient = true;
    login(loginRequest);
  }
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <Flex className={cx(styles["h-full"])}>
      <LeftSide />
      <div className={cx("half-box", "right")}>
        <Flex vertical className={cx(styles["right-inner-flex"])}  align="center" justify="center">
          <img height={250} src="/unDraw/undraw_join_re_w1lh.svg" alt="No tasks" />

          <Paragraph className={cx(styles.para)}>Please enter your details to login.</Paragraph>

          <Form
            name="login form"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 24 }}
            className={cx(styles.form)}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="userNameOrEmailAddress"
              rules={[{ required: true, message: 'Please input your username/email!' }]}
            >
              <Input size="large"/>
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
              className={cx(styles['form-item'])}
            >
              <Input.Password size="large"/>
            </Form.Item>

            <Form.Item>          
              <Flex align="center" justify="space-between" vertical>
                <Button className={cx(styles.button)} htmlType="submit" size="large">
                  Login
                </Button>      
                <Paragraph>
                  Don't yet have an account?{" "}
                  <Link href={"/register"}>
                    Register
                  </Link>
                </Paragraph>
              </Flex>
            </Form.Item>  
          </Form>
        </Flex>
      </div>
    </Flex>
  );
}
