"use client";

import React from "react";
import useStyles from "./style/style";
import type {FormProps} from "antd";
import { Button, Flex, Typography, Form, Input, Select } from "antd";
import LeftSide from "@/components/leftSide";
import Link from "next/link";
import { useAuthActions } from "@/providers/authProvider";
import { IRegisterRequest } from "@/providers/authProvider/types";

const { Title, Paragraph } = Typography;

// Each time, a new form item will be one of the following properties
enum Role {
  Client = "Client",
  Executor = "Executor"
}

type FieldType = {
  name: string;
  surname: string;
  emailAddress?: string;
  password: string;
  confirm?: string;
  role: Role;
}


const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
}

export default function Register() {
  const { cx, styles } = useStyles();
  const { register } = useAuthActions();
  
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.confirm !== values.password) {
      return alert("Confirm must match the password.");
    }
    console.log('Success:', values);
    const registerRequest: IRegisterRequest = values;
    registerRequest.isActive = true;
    registerRequest.roleNames = [values.role]
    registerRequest.userName = values.emailAddress;

    register(registerRequest);
  }

  return (
    <Flex className={cx(styles["h-full"])}>
      <LeftSide />
      <div className={cx("half-box", "right")}>
        <Flex vertical className={cx(styles["right-inner-flex"])}  align="center" justify="center">
          <Paragraph className={cx(styles.para)}>Please enter your details to Register.</Paragraph>

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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input size="large"/>
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
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Confirm"
              name="confirm"
              rules={[{ required: true, message: "Please confirm your password!" }]}
              className={cx(styles['form-item'])}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please pick one of the possible roles provided!" }]} 
            >
              <Select 
                size="large"
                placeholder="Select role"
                placement="topRight"
                options={[
                  {
                    value: Role.Client,
                    label: Role.Client
                  },
                  {
                    value: Role.Executor,
                    label: Role.Executor
                  }
                ]}
              />
            </Form.Item>

            <Form.Item>          
              <Flex align="center" justify="space-between">
                <Button className={cx(styles.button)} htmlType="submit" size="large">
                  Register
                </Button>
                <Link href={"/login"}>
                  <Button size="large">Login</Button>
                </Link>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </div>
    </Flex>
  );
}
