"use client";

import LeftSide from "@/components/leftSide";
import { useAuthActions } from "@/providers/authProvider";
import { IRegisterRequest } from "@/providers/authProvider/types";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input, Select, Typography } from "antd";
import Link from "next/link";
import useStyles from "./style/style";

const { Paragraph } = Typography;

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
        <Flex vertical className={cx(styles["right-inner-flex"])} align="center" justify="center">
          <img height={50} src="/unDraw/undraw_join_re_w1lh.svg" alt="No tasks" />

          <Paragraph className={cx(styles.para)}>Please enter your details to Register.</Paragraph>

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
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input size="large" />
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
              label="Confirm Password"
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
              <Flex align="center" justify="space-between" vertical>
                <Button className={cx(styles.button)} htmlType="submit" size="large">
                  Register
                </Button>
                <Paragraph>
                  Already have an account?{" "}
                  <Link href={"/login"}>
                    Login
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
